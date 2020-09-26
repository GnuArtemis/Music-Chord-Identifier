
function getChord(notes, intervals) {
    //The notes used for filtering and sorting for best fix
    var allNotes = notes;

    if (allNotes.length === 0) {
        $("#answer-box").text("Chords require at least one note.")
    } else if (allNotes.length === 1) {
        $("#answer-box").text(`Unison on ${allNotes[0]}`)
    } else if (allNotes.length === 2) {
        onlyTwoNotes(allNotes, intervals);
    } else {
        //Creates a string, with variable length,
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


        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=${urlFormat}}`,
            method: "GET"
        }).then(function (response) {

            response = JSON.parse(response);

            console.log(response);

            if (!findExactFit(response, allNotes)) {
                var possibleMatches = findBestAnswer(response, allNotes);
                if(possibleMatches) displayLikelyMatches(possibleMatches);
            }

        }).always(function () {
            refreshKeys();
        })
    }
}

//Sorts through the API result and console logs (an returns true) an exact match if one exists
function findExactFit(response, allNotes) {

    let exactMatchLength = allNotes.length - 1;
    for (let i = 0; i < allNotes.length; i++) {
        exactMatchLength += allNotes[i].length;
    }


    for (const property in response.chords) {
        for (const key in response.chords[property]) {
            //  console.log(`${property}: ${key}, ${response.chords[property][key]}`)

            if (response.chords[property][key].length === (exactMatchLength)) {

                console.log("HIT!!!");
                //DESIRED ANSWER IN DESIRED FORMAT
                console.log(`${property} ${key}`);
                $(".chord-result").text(`${property} ${key}`)
                displayChordImage(property, key);
                displayChordSound(property, key);
                scales_chords_api_onload();
                console.log(response.chords[property][key])
                return true;

                // response.chords[property][key].includes(allNotes[0]) || response.chords[property][key].includes(noteEquivalencies[allNotes[0]])

            }
        }
    }
    return false;

}
//This will only trigger if we have at least 3 keys pressed, and there is NO exact match 
function findBestAnswer(response) {

    if (!response.chords) {
        console.log("No chords found for these notes :(")
        return null;
    }

    var likelihood0 = [];
    var likelihood1 = [];
    var likelihood2 = [];
    var likelihood3 = [];
    var likelihood4 = [];
    var likelihood5 = [];

    for (const property in response.chords) {
        for (const key in response.chords[property]) {
            // console.log(`${property}: ${key}, ${response.chords[property][key]}`)

            //If KEY is major, minor, it is 1st likelihood
            if (key === "major" || key === "minor") {
                likelihood0.push(`${property} ${key}`)
            }
            //If KEY is Dominant seventh, diminished or augmented triad it is 2nd likelihood
            else if (key === "dominant7th" || key === "diminished" || key === "augmented") {
                likelihood1.push(`${property} ${key}`);
            }
            //If KEY is diminished or half diminished, it is 3rd likelihood
            else if (key === "diminished7" || key === "m7b5") {
                likelihood2.push(`${property} ${key}`);
            }
            //If KEY is augmented, Major Seventh, or Minor Seventh, it is 4th likelihood
            else if (key === "major7" || key === "minor7" || key === "augmented7") {
                likelihood3.push(`${property} ${key}`);
            }
            //If KEY is Extended or Suspended, it is 5th likelihood
            else if (key === "sus2" || key === "sus4") {
                likelihood4.push(`${property} ${key}`);
            }
            //If KEY is anything else, it is sixth likelihood
            else {
                likelihood5.push(`${property} ${key}`);
            }
        }
    }

    console.log(likelihood0);
    console.log(likelihood1);
    console.log(likelihood2);
    console.log(likelihood3);
    console.log(likelihood4);
    console.log(likelihood5);

    return [likelihood0, likelihood1, likelihood2, likelihood3, likelihood4, likelihood5]
}

//TODO: function that handles case where only 1 note is chosen. Returns name of note chosen and the analysis of "unison"
//thisKey.setAttribute("data-index", iKeys);


//TODO: function that handles case where only 2 notes are chosen. Returns the interval between the chords
function onlyTwoNotes(notes, intervals) {
    var distance = Math.abs(intervals[0] - intervals[1])
    if (distance == 1) {

        console.log("this is a minor second")
        $("#answer-box").text("Minor 2nd")

    } else if (distance == 2) {
        $("#answer-box").text("Major 2nd")
    }
    else if (distance == 3) {
        $("#answer-box").text("Minor 3rd")
    }
    else if (distance == 4) {
        $("#answer-box").text("Major 3rd")
    }
    else if (distance == 5) {
        $("#answer-box").text("Perfect 4th")
    }
    else if (distance == 6) {
        $("#answer-box").text("Tritone")
    }
    else if (distance == 7) {
        $("#answer-box").text("Perfect 5th")
    }
    else if (distance == 8) {
        $("#answer-box").text("Minor 6th")
    }
    else if (distance == 9) {
        $("#answer-box").text("Major 6th")
    }
    else if (distance == 10) {
        $("#answer-box").text("Minor 7th")
    }
    else if (distance == 11) {
        $("#answer-box").text("Major 7th")
    }

    else {
        // console.log ("Please try again")
    }

}



function displayChordImage(chord, attribute) {
    attribute = formatAttr(attribute);
    $("#chord-image").html(`<ins class=\"scales_chords_api\" chord=\"${chord}${attribute}\" instrument=\"piano\" output=\"image\"></ins>`);
}

function displayChordSound(chord, attribute) {
    attribute = formatAttr(attribute);
    $("#chord-sound").html(`<ins class=\"scales_chords_api\" chord=\"${chord}${attribute}\" instrument=\"piano\" output=\"sound\"></ins>`);
}




function refreshKeys() {
    $(".key").each(function () {
        $(this).attr("data-active", "false");
    })
    document.getElementById("submit").disabled = true;
}

function setButtonState() {
    let anySelected = false;
    $(".key").each(function () {
        anySelected |= $(this).attr("data-active") === "true";
    })
    document.getElementById("submit").disabled = !anySelected;
}

// activates the hamburger menu for external links in NAV bar.
$(document).ready(function () {
    $('.sidenav').sidenav();
    generateKeyboard(0, 0, document.getElementById("keyboard"));
    setButtonState();
});

// click event to set key depress.
$("#keyboard").on("click", ".key", function (e) {
    const keyPressed = $(this);
    if (keyPressed.attr("data-active") === "false") fnPlayNote(keyPressed.attr("data-note"), keyPressed.attr("data-octave"));
    keyPressed.attr("data-active", keyPressed.attr("data-active") === "false");
    setButtonState();
})

// submit results to find chord
$("#submit").on("click", function (e) {
    const pressedKeys = [];
    intervals = [];

    $(".key").each(function () {
        if ($(this).attr("data-active") === "true") {
            intervals.push($(this).attr("data-index"))
            pressedKeys.push($(this).attr("data-note"));
        }

    })
    console.log(pressedKeys);
    refreshKeys();
    getChord(pressedKeys, intervals);
})
var intervals;

function displayLikelyMatches(possibleMatches) {
    console.log(possibleMatches);
    var listeners = 0;
    for (let i = 0; i < possibleMatches.length; i++) {
        if (!possibleMatches[i].length) {
            continue;
        }
        for (let j = 0; j < possibleMatches[i].length; j++) {
            let currChord = possibleMatches[i][j];
            if (!listeners) {
                //RESULT TO BE DISPLAYED
                console.log(currChord);
                listeners = i;
            } else {
                if (i === listeners) {
                    //EQUALLY LIKELY RESULTS, NOT DISPLAYED
                    console.log("equally likely " + currChord)
                } else {
                    //LESS LIKELY, STILL POSSIBLE RESULTS. DEPENDENT ON TIER OF FIRST RESULT
                    if ((i - listeners) === 1) {
                        console.log(`Still fairly likely ${currChord}`)
                    } else if ((i - listeners) === 2) {
                        console.log(`This is fairly unlikely: ${currChord}`)
                    } else if ((i - listeners) === 3) {
                        console.log(`This is quite unlikely ${currChord}`);
                    } else {
                        console.log(`This is very unlikely, but still technically possible ${currChord}`);
                    }
                }
            }

        }

    }

}


var abbrev = {
    "source": "https://en.wikipedia.org/wiki/List_of_chords",

    "major": ["Major", "In music theory, a major chord is a chord that has a root, major third, and perfect fifth. When a chord has these three notes alone, it is called a major triad."],
    "9sus4": ["9 Suspended 4", "A jazz sus chord or dominant 9sus4 chord is a seventh chord on the fifth scale degree of the key with a suspended fourth and an added ninth. "],
    "sus2": ["Suspended 2", "A suspended chord is a musical chord in which the third is omitted, replaced usually with either a perfect fourth or a major second although the fourth is far more common."],
    "add9": ["Add 9th", "The add9 chord is a big favorite in pop and acoustic rock music. The add9 chord is simply a major triad with an added ninth (9). The major triad consists of the root (1), the major third (3) and the perfect fifth (5)."],
    "madd9": ["Minor Added 9th", "The 6/9 chord is a pentad with a major triad extended by a sixth and ninth above the root, but no seventh, thus: C6/9 is C,E,G,A,D. ... The minor 6/9 chord is a minor triad with an added 6th of the Dorian mode and an added 9th, and is also suitable as a minor tonic in jazz."],
    "minor9": ["Minor 9th", "A minor 9th chord is a chord having a root (1), a minor third (b3), a perfect fifth (5), a minor 7th (b7) and a major 9th (9)."],
    "major6": ["Major 6th", "In music from Western culture, a sixth is a musical interval encompassing six note letter names or staff positions, and the major sixth is one of two commonly occurring sixths. It is qualified as major because it is the larger of the two. "],
    "major7": ["Major 7th", "In music, a major seventh chord is a seventh chord in which the third is a major third above the root and the seventh is a major seventh above the root."],
    "major9": ["Major 9th", "Major 9th chords are made of five notes, they contain a root (1), a major third (3), a perfect fifth (5), a major seventh (7) and a ninth (9). A maj9 is simply a major seventh chord with a ninth added. It can aslo be seen as a major triad (1 - 3 - 5) with a seventh (7) and a ninth (9)."],
    "major11": ["Major 11th", "In music theory, an eleventh chord is a chord that contains the tertian extension of the eleventh. Typically found in jazz, an eleventh chord also usually includes the seventh and ninth, and elements of the basic triad structure. Variants include the dominant eleventh, minor eleventh, and the major eleventh chord."],
    "minor": ["Minor", "In music theory, a minor chord is a chord having a root, a minor third, and a perfect fifth. When a chord has these three notes alone, it is called a minor triad. For example, the minor triad built on C, called a C minor triad, has pitches C–E♭–G: A minor triad can be represented by the integer notation {0, 3, 7}."],
    "minor6": ["Minor 6th", "In music theory, a minor chord is a chord having a root, a minor third, and a perfect fifth. When a chord has these three notes alone, it is called a minor triad. For example, the minor triad built on C, called a C minor triad, has pitches C–E♭–G: A minor triad can be represented by the integer notation {0, 3, 7}."],
    "minor7": ["Minor 7th", "In music, a minor seventh chord is any seventh chord in which the third is a minor third above the root. Most typically, minor seventh chord refers to a chord in which the third is a minor third above the root and the seventh is a minor seventh above the root."],
    "sus4": ["Suspended 4", "A suspended chord is a musical chord in which the third is omitted, replaced usually with either a perfect fourth or a major second although the fourth is far more common."],
    "7sus4": ["7 Suspended 4", "7sus4 chords are really just sus4 chords with flattened 7th degree notes added. Remember that sus (suspended) means that the chord does not have a 3rd degree note, thus is neither major nor minor, thereby having the open sounding quality."],
    "dominant7th": ["Dominant 7th", "In music theory, a dominant seventh chord, or major minor seventh chord, is a seventh chord, usually built on the fifth degree of the major scale, and composed of a root, major third, perfect fifth, and minor seventh."],
    "dominant9th": ["Dominant 9th", "In music theory, a ninth chord is a chord that encompasses the interval of a ninth when arranged in close position with the root in the bass. The ninth chord and its inversions exist today, or at least they can exist. "],
    "augmented": ["Augmented", "An augmented triad is a chord, made up of two major thirds. The term augmented triad arises from an augmented triad being considered a major chord whose top note is raised. When using popular-music symbols, it is indicated by the symbol + or aug."],
    "augmented7": ["Augmented 7th", "The augmented seventh chord, or seventh augmented fifth chord, or seventh sharp five chord is a seventh chord composed of a root, major third, augmented fifth, and minor seventh. It can be viewed as an augmented triad with a minor seventh. When using popular-music symbols, it is denoted by +⁷, aug⁷, or ⁷♯⁵."],
    "diminished": ["Diminished", "In music, a diminished triad is a triad consisting of two minor thirds above the root. It is a minor triad with a lowered fifth. When using popular-music symbols, it is indicated by the symbols dim, ᵒ, m♭⁵, or MI."],
    "diminished7": ["Diminished 7th", "The diminished seventh chord is a seventh chord composed of a root note, together with a minor third, a diminished fifth, and a diminished seventh above the root."],
    "m7b5": ["Minor 7 flat 5", "Half-diminished chords are also known as minor seven flat five chords (m7b5) because they are built as a minor chord with a flat five (b5). Half-diminished chords are four-note shapes that contain the interval pattern 1 b3 b5 b7."],

}

function formatAttr(attribute) {
    let table = {
        'major': 'M',
        'major6': 'M6',
        'major7': 'M7',
        'major9': 'M9',
        'major11': 'M11',
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