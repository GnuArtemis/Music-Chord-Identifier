//API Documentation: (no key required)   www.tofret.com/
//These are here for placeholding purposes! These ONLY go in the api call, to make sure that the sharps are properly formatted. For all other purposes, the # notation is preferred. 
var first_note = "A";
var second_note = "E";
var third_note = "F";
// var fourth_note = "E"
//var allNotesAPIFormat = [first_note, second_note, third_note];


//This format is required for sorting through the results of the API call. 
var allNotes = ["A","E","F"];


$.ajax({
    url: `https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=${first_note}+${second_note}+${third_note}`,
    method: "GET"
}).then(function (response) {

    response = JSON.parse(response);

    console.log(response);

    if(!findExactFit(response)){
        findBestAnswer(response);
    }

})

//Sorts through the API result and console logs (an returns true) an exact match if one exists
function findExactFit(response) {

    let exactMatchLength = allNotes-1;
    for(let i = 0; i < allNotes.length; i++) {
        exactMatchLength += allNotes[i].length;
    }


    for (const property in response.chords) {
        for (const key in response.chords[property]) {
            console.log(`${property}: ${key}, ${response.chords[property][key]}`)

            if (response.chords[property][key].length === (exactMatchLength)) {
                if (response.chords[property][key].includes(allNotes[0])) {
                    console.log("HIT!!!");
                    //DESIRED ANSWER IN DESIRED FORMAT
                    console.log(`${property} ${key}`);
                    return true;
                }
                // response.chords[property][key].includes(allNotes[0]) || response.chords[property][key].includes(noteEquivalencies[allNotes[0]])

            }
        }
    }
}

//This will only trigger if we have at least 3 keys pressed, and there is NO exact match 
function findBestAnswer(response) {

    if(!response.chords){
        console.log("No chords found for these notes :(")
        return;
    }

    for (const property in response.chords) {
        for (const key in response.chords[property]) {
            // console.log(`${property}: ${key}, ${response.chords[property][key]}`)

           //If KEY is major, minor, it is 1st likelihood
           //If KEY is Dominant seventh, it is 2nd likelihood
           //If KEY is diminished, it is 3rd likelihood
           //If KEY is augmented, Major Seventh, or Minor Seventh, it is 4th likelihood
           //If KEY is Extended or Suspended, it is 5th likelihood
           //If KEY is anything else, it is sixth likelihood
        }
    }
}

//TODO: function that handles case where only 1 note is chosen. Returns name of note chosen and the analysis of "unison"

//TODO: function that handles case where only 2 notes are chosen. Returns the interval between the chords


// activates the hamburger menu for external links in NAV bar.
$(document).ready(function () {
    $('.sidenav').sidenav();
});



// click events with color class added.
$("#keyboard").on("click", ".key", function (e) {
    e.preventDefault();
    let key = $(this);
    console.log(key);
    if (key.attr("data-active") === "false") {
        key.attr("data-active", "true");
    }
    else key.attr("data-active", "false");
})


