// Click event to set piano key depress
function clickKey() {
    const keyPressed = $(this);
    
    if (keyPressed.attr("data-active") === "false") fnPlayNote(keyPressed.attr("data-note"), keyPressed.attr("data-octave"));
    keyPressed.attr("data-active", keyPressed.attr("data-active") === "false");
    syncKeyboards(keyPressed);
    setButtonState();
}

// Syncs first octave of both keyboards together
function syncKeyboards(keyPressed) {
    if(keyPressed.attr("data-index") > 11) return;
    let otherBoard = keyPressed.parent().attr("id") === "keyboard" ? $("#keyboard-s") : $("#keyboard");
    console.log(otherBoard);
    otherBoard.find(`.key[data-index=${keyPressed.attr("data-index")}]`).attr("data-active",keyPressed.attr("data-active"));
}

//add to both keyboards
$("#keyboard").on("click", ".key", clickKey);
$("#keyboard-s").on("click", ".key", clickKey);

// Submit event that parses the user input and passes it to our analysis functions in a better format
$("#submit").on("click", function (e) {
    const selector = $(window).width() > 600 ? "#keyboard .key" : "#keyboard-s .key";
    const pressedKeys = [];
    intervals = [];
    $("#possible-results").empty();
    $("#approx-result").empty();
    $(selector).each(function () {
        if ($(this).attr("data-active") === "true") {
            intervals.push($(this).attr("data-index"))
            if (pressedKeys.indexOf($(this).attr("data-note")) === -1) pressedKeys.push($(this).attr("data-note"));
        }

    })
    refreshKeys();
    $(".hide-when-searching").hide();
    getChord(pressedKeys, intervals);
})

//sync keyboards

//This function takes the formatted user input, and depending on certain qualities, inputs it into the most relevant algorithmic analysis
function getChord(notes, intervals) {

    //If the user has selected 0 notes, it is a special case. If the user has selected only one note, it is a special case. If the user has selected exactly 2 notes, it needs to be identified as an Interval, not a chord. If the user has selected 3 or more notes, it needs to be identified as a chord, or if no chord exists that exactly matches what was entered, chords that the entered notes could be based on context
    if (notes.length === 0) {
        $("#answer-box").text("Chords require at least one note.");
    } else if (notes.length === 1) {
        $("#answer-box").text(`Unison on ${notes[0]}`);
        if (intervals.length === 2) $("#answer-box").text("Octave")
    } else if (notes.length === 2) {
        onlyTwoNotes(notes, intervals);
        if (intervals.length > 2) $("#approx-result").text("This refers to the lowest two notes");
    } else {
        //The case where 3 or more notes are chosen is the most complex. This for loop takes the user input and reformats so that it can be entered into the ajax request for any number of notes, most importantly changing the "#" (sharp) symbol
        var urlFormat = "";
        for (var i = 0; i < notes.length; i++) {
            if (i > 0) {
                urlFormat += "+"
            }
            if (notes[i].includes("#")) {
                var urlFormatNote = notes[i].slice(0, -1) + "%23"
                urlFormat += urlFormatNote;
            } else {
                urlFormat += notes[i];
            }
        }

        setPageLoading(true);

        //This ajax request calls all possible chords that use the notes included in user input
        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=${urlFormat}}`,
            method: "GET"
        }).then(function (response) {

            response = JSON.parse(response);

            //First, looks for an exact match with the function findExactFit. If none exists, findExactFit returns null, and thus we do a secondary search for the most likely results.
            if (!findExactFit(response, notes)) {
                var possibleMatches = findBestAnswer(response, notes);
                if (possibleMatches) displayLikelyMatches(possibleMatches);
            }

        }).always(function () {
            refreshKeys();
            setPageLoading(false);
        })
    }
}

//Sorts through the API result, displays a perfect match and returns true if and only if a perfect match exists.
function findExactFit(response, notes) {

    //Due to the nature of the API, an exact match will always be a string with length equal to the user input plus spaces in between each letter
    let exactMatchLength = notes.length - 1;
    for (let i = 0; i < notes.length; i++) {
        exactMatchLength += notes[i].length;
    }

    //The API call returns nested objects. The loops below sort through each chord value, and returns true if an exact match is found.
    for (const property in response.chords) {
        for (const key in response.chords[property]) {

            if (response.chords[property][key].length === (exactMatchLength)) {
                
                //updating page
                $(".chord-result").text(`${property} ${abbrev[key][0]}`)
                $(".chord-result").attr("chordCode", key);
                $(".chord-result").attr("chordRoot", property);
                let chord = property + formatAttr(key);
                displayChordImage(chord);
                displayChordSound(chord);
                if(key === "major") getChordProgressions(chord);
                scales_chords_api_onload();
                //end updating page

                console.log(response.chords[property][key])
                return true;

            }
        }
    }
    return false;

}

//This function sorts through all possible results, and returns a nested array with all possible chords sorted by how common they are in music. 
function findBestAnswer(response) {

    //Special case where there is no possible chord with the given inputs
    if (!response.chords) {
        $("#answer-box").text("No jazz chords found :( ")
        return null;
    }

    //Chords in the same array are, for our purposes here, equally likely
    var likelihood0 = [];
    var likelihood1 = [];
    var likelihood2 = [];
    var likelihood3 = [];
    var likelihood4 = [];
    var likelihood5 = [];

    //Sorts the results by how likely they are, with likelihood0 containing the most common chords, and likelihood5 the least common chords
    for (const property in response.chords) {

        for (const key in response.chords[property]) {
            // console.log(`${property}: ${key}, ${response.chords[property][key]}`)//Legacy code for the purpose of testing

            //If KEY is major, minor triad,  it is 1st likelihood
            if (key === "major" || key === "minor") {
                likelihood0.push([property, key]);
            }
            //If KEY is Dominant seventh, diminished or augmented triad it is 2nd likelihood
            else if (key === "dominant7th" || key === "diminished" || key === "augmented") {
                likelihood1.push([property, key]);
            }
            //If KEY is diminished or half diminished, it is 3rd likelihood
            else if (key === "diminished7" || key === "m7b5") {
                likelihood2.push([property, key]);
            }
            //If KEY is augmented, Major Seventh, or Minor Seventh, it is 4th likelihood
            else if (key === "major7" || key === "minor7" || key === "augmented7") {
                likelihood3.push([property, key]);
            }
            //If KEY is Extended or Suspended, it is 5th likelihood
            else if (key === "sus2" || key === "sus4") {
                likelihood4.push([property, key]);
            }
            //If KEY is anything else, it is sixth likelihood
            else {
                likelihood5.push([property, key]);
            }


        }
    }

    return [likelihood0, likelihood1, likelihood2, likelihood3, likelihood4, likelihood5]
}

//Takes the nested array of sorted potential matches, and displays them in order of likelihood. Only 5 results in total are shown, and exact results are hidden in dropdowns
function displayLikelyMatches(possibleMatches) {
    var listener = 0;
    var limitResults = 0;

    var collapseList = $("#possible-results");
    for (let i = 0; i < possibleMatches.length; i++) {
        if (!possibleMatches[i].length) {
            continue;
        }
        var listEl = $("<li>");
        var header = $("<div>");
        header.addClass("collapsible-header");
        var bod = $("<div>");
        bod.addClass("collapsible-body");

        listEl.append(header, bod);


        for (let j = 0; j < possibleMatches[i].length; j++) {
            let currChord = possibleMatches[i][j];
            if (!listener) {
                //RESULT TO BE DISPLAYED
                $("#answer-box").text(`Most likely result: ${currChord[0]} ${abbrev[currChord[1]][0]}`)
                $(".chord-result").attr("chordCode", currChord[0]);
                $(".chord-result").attr("chordRoot", currChord[1]);
                // $("#approx-result").text("" + currChord)

                displayChordImage(`${currChord[0]}+${formatAttr(currChord[1])}`);
                displayChordSound(`${currChord[0]}+${formatAttr(currChord[1])}`);
                scales_chords_api_onload();

                listener = i;
            } else {
                //    <a class="waves-effect waves-light btn modal-trigger" href="#definitions">Modal</a>
                let nextChord = $("<a>");
                nextChord.addClass("waves-effect waves-light btn modal-trigger");
                nextChord.attr("href", "#definitions");
                nextChord.data("chordCode", currChord[1]);
                nextChord.data("chordRoot", currChord[0])
                nextChord.text(`${currChord[0]} ${abbrev[currChord[1]][0]}`);
                bod.append(nextChord);
                bod.append("<br>")

                if (limitResults < 5) {
                    if (i === listener) {
                        header.text("Equally Likely Chords: ");
                        limitResults++;
                    } else {
                        //LESS LIKELY, STILL POSSIBLE RESULTS. DEPENDENT ON TIER OF FIRST RESULT
                        if ((i - listener) === 1) {
                            header.text("Fairly Likely Chords: ");
                            limitResults++;
                        } else if ((i - listener) === 2) {
                            header.text("Fairly Unlikely Chords: ");
                            limitResults++;
                        } else if ((i - listener) === 3) {
                            header.text("Quite Unlikely Chords");
                            limitResults++;
                        } else {
                            header.text("Technically Possible Chords:");
                            limitResults++;
                        }
                    }
                }
                collapseList.append(listEl)
            }

        }
    }
}

//Function that handles case where only 2 notes are chosen. Returns the interval between the chords, a value based on the distance between two keys
function onlyTwoNotes(notes, intervals) {
    var distance = Math.abs(intervals[0] - intervals[1])
    if (distance == 1) {
        $("#answer-box").text("Minor 2nd");

    } else if (distance == 2) {
        $("#answer-box").text("Major 2nd");
    }
    else if (distance == 3) {
        $("#answer-box").text("Minor 3rd");
    }
    else if (distance == 4) {
        $("#answer-box").text("Major 3rd");
    }
    else if (distance == 5) {
        $("#answer-box").text("Perfect 4th");
    }
    else if (distance == 6) {
        $("#answer-box").text("Tritone");
    }
    else if (distance == 7) {
        $("#answer-box").text("Perfect 5th");
    }
    else if (distance == 8) {
        $("#answer-box").text("Minor 6th");
    }
    else if (distance == 9) {
        $("#answer-box").text("Major 6th");
    }
    else if (distance == 10) {
        $("#answer-box").text("Minor 7th");
    }
    else if (distance == 11) {
        $("#answer-box").text("Major 7th");
    }
    else if (distance == 12) {
        $("#answer-box").text("Octave");
    }
    else if (distance == 13) {
        $("#answer-box").text("Minor 9th");
    }
    else if (distance == 14) {
        $("#answer-box").text("Major 9th");
    }
    else if (distance == 15) {
        $("#answer-box").text("Minor 10th");
    }
    else if (distance == 16) {
        $("#answer-box").text("Major 10th");
    }
    else if (distance == 17) {
        $("#answer-box").text("Perfect 11th")
    }
    else if (distance == 18) {
        $("#answer-box").text("Tritone")
    }
    else if (distance == 19) {
        $("#answer-box").text("Perfect 12th")
    }
    else { //if distance greater than 19
        $("#answer-box").text("Intervals this far apart are not well defined")
    }

}

//Sets spinners while waiting for API call
function setPageLoading(isLoading) {
    if (isLoading) {
        $(".preloader-wrapper").show();
        $(".submit-button-area").hide();
        $("#chord-image").hide();
        $("#chord-sound").hide();
    }
    else {
        $(".preloader-wrapper").hide();
        $(".submit-button-area").show();
        $("#chord-image").show();
        $("#chord-sound").show();
    }
}

function displayChordImage(chord) {
    //attribute = formatAttr(attribute);
    $("#chord-image").html(`<ins class=\"scales_chords_api\" chord=\"${chord}\" instrument=\"piano\" output=\"image\"></ins>`);
}

function displayChordSound(chord) {
    //attribute = formatAttr(attribute);
    $("#chord-sound").html(`<ins class=\"scales_chords_api\" chord=\"${chord}\" instrument=\"piano\" output=\"sound\"></ins>`);
}

//Resets the keys after analysis
function refreshKeys() {
    $(".key").each(function () {
        $(this).attr("data-active", "false");
    })
    document.getElementById("submit").disabled = true;
}

//Controls depress of piano keys
function setButtonState() {
    let anySelected = false;
    $(".key").each(function () {
        anySelected |= $(this).attr("data-active") === "true";
    })
    document.getElementById("submit").disabled = !anySelected;
}

// Activates the hamburger menu for external links in NAV bar, activates the collapsible, generates the keyboard, opens the modal with directions if this is the first time the page has been visited
$(document).ready(function () {
    $('.sidenav').sidenav();
    generateKeyboard(0, 0, document.getElementById("keyboard-s"));
    generateKeyboard(0, 1, document.getElementById("keyboard"));
    $(".preloader-wrapper").hide();
    setButtonState();
    $('.collapsible').collapsible();
    $(".hide-when-searching").hide();
    $('.modal').modal();

    if (!localStorage.getItem("visited")) {
        $('.modal').modal('open');
        localStorage.setItem("visited", "true")
    }
});

//Click event to trigger the modal
$("#possible-results").on("click", function (event) {
    if ($(event.target).data('chordCode')) modalInfo(event);
})


// Planned future functionality, so that the modal event can be triggered from the top list as well as "possible but less likely" answers
// $(".answer-box").on("click", function(event){
//     if ($(event.target).data('chordCode')) modalInfo(event);
// })


//Brings up a modal with a short definition of the clicked chord, link to more information, and gives the static image+soundbyte of the chord in the designated spot
function modalInfo(event) {
    const attribute = $(event.target).data('chordCode');
    const chord = $(event.target).data('chordRoot')

    $("#def-header").text(abbrev[attribute][0]);
    $("#def-body").text(abbrev[attribute][1]);

    displayChordImage(`${chord}${formatAttr(attribute)}`);
    displayChordSound(`${chord}${formatAttr(attribute)}`);
    scales_chords_api_onload();
}

//Provides chord progressions for major or minor root chords
function getChordProgressions(chord) {
    const progressionArea = $("#prog-area");
    progressionArea.empty();
    const start = "Chord Harmonized Progressions";
    const end = "Scales Related to";
    const separator = /<[^<>]*>/;
    const url = "www.scales-chords.com/chord/piano/" + chord;
    (async () => {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" + url);
        let text = await response.text();
        text = text.match(`${start}[\\s\\S]*${end}`)[0].split(separator);
        let tokens = [];
        
        for (const str of text) {
            if(str.trim().length!=0) tokens.push(str);
        }
        
        progressionArea.append($("<div>").addClass("chord-prog-header").text(`Related chords in the key of ${chord.substring(0,chord.length-3)} major`));
        progressionArea.append($("<div>").addClass("divider"));
        const body = $("<div>").addClass("chord-prog-body");
        progressionArea.append(body);
        
        for(let i = 2; i < 9; i++) {
            body.append($("<span>").text(tokens[i]));
        }
        $(".hide-when-searching").show();
      })()
}

//Object redefining chord qualities for use in 2nd API (that plays the chord)
function formatAttr(attribute) {
    let table = {
        'major': 'maj',
        'major6': 'maj6',
        'major7': 'maj7',
        'major9': 'maj9',
        'major11': 'maj11',
        'minor': 'm',
        'minor6': 'm6',
        'minor7': 'm7',
        'minor9': 'm9',
        'sus2': 'sus2',
        'sus4': 'sus4',
        '7sus4': '7sus4',
        '9sus4': '9sus4',
        'add9': 'add9',
        'madd9': 'madd9',
        'augmented': 'aug',
        'augmented7': 'aug7',
        'diminished': 'dim',
        'diminished7': 'dim7',
        'dominant7th': '7',
        'dominant9th': '9',
        'm7b5': 'm7b5'
    }
    return table[attribute];
}

//Reformats the API result with no abbreviations and proper formatting, provides the chord definitions
var abbrev = {
    "major": ["Major", "A major triad is a chord that has a root, major third, and perfect fifth."],
    "9sus4": ["9 Suspended 4", "A jazz sus chord or dominant 9sus4 chord is a seventh chord on the fifth scale degree of the key with a suspended fourth and an added ninth."],
    "sus2": ["Suspended 2", "A suspended chord occurs when the third is omitted, replaced with either a perfect fourth or a major second."],
    "add9": ["Added 9th", "The add9 chord is a major triad  with an added ninth."],
    "madd9": ["Minor Added 9th", "The 6/9 chord is a 5-note chord, with a major triad extended by a sixth and ninth above the root, but no seventh."],
    "minor9": ["Minor 9th", "A minor 9th chord is a chord consisting of a root, a minor third, a perfect fifth, a minor seventh and a major ninth."],
    "major6": ["Major 6th", "A major 6th chord (not to be confused with the interval major sixth) is a major triad with an added sixth."],
    "major7": ["Major 7th", "A major seventh chord is a seventh chord in which the third is a major third above the root and the seventh is a major seventh above the root."],
    "major9": ["Major 9th", "A maj9 is a major seventh chord with a ninth added, or equivalently a major triad with an added major seventh and ninth."],
    "major11": ["Major 11th", "An eleventh chord is a major triad with an added seventh, ninth, and eleventh."],
    "minor": ["Minor", "A major triad is a chord that has a root, minor third, and perfect fifth."],
    "minor6": ["Minor 6th", "A minor 6th chord (not to be confused with the interval minor sixth) is a minor triad with an added sixth."],
    "minor7": ["Minor 7th", "A minor seventh chord is any seventh chord in which the third is a minor third above the root."],
    "sus4": ["Suspended 4", "A suspended chord occurs when the third is omitted, replaced  with either a perfect fourth or a major second."],
    "7sus4": ["7 Suspended 4", "A 7sus4 chords consists of a suspended 4 chord with an added minor seventh."],
    "dominant7th": ["Dominant 7th", "A dominant seventh chord, or major minor seventh chord, is a seventh chord, usually built on the fifth degree of the major scale, and composed of a root, major third, perfect fifth, and minor seventh."],
    "dominant9th": ["Dominant 9th", "A dominant ninth chord is a dominant seventh with an added ninth."],
    "augmented": ["Augmented", "An augmented triad is a chord made up of two major thirds."],
    "augmented7": ["Augmented 7th", "An augmented seventh chord, or seventh augmented fifth chord, consists of an augmented triad with an added major seventh."],
    "diminished": ["Diminished", "A diminished triad is a chord mad up of two minor thirds."],
    "diminished7": ["Diminished 7th", "A diminished seventh chord consists of a diminished triad with an added diminished seventh."],
    "m7b5": ["Minor 7 flat 5", "Minor 7 flat 5 chords (m7b5), also known as Half-diminished chords, consist of a diminished triad with an added minor seventh."],
    "JimiHendrix": ["Jimi Hendrix Chord", "A 'Jimi Hendrix' chord consists of a dominant sevent with an added augmented ninth"]

}
