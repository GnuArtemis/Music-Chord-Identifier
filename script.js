//API Documentation: (no key required)   www.tofret.com/
var first_note = "B";
var second_note = "G";
var third_note = "E";
var numNotes = 3;
var allNotes = [first_note,second_note,third_note];

"https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=" + "A+B+C"

$.ajax({
    url: `https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=${first_note}+${second_note}+${third_note}`,
    method: "GET"
}).then(function (response) {
    // console.log("hello world")
    response = JSON.parse(response);

    console.log(response);

    findExactFit(response);



    // console.log
})

function findExactFit(response) {
    // var newList = Object.entries(response.chords);
    // console.log(newList);


    for (const property in response.chords) {
        for (const key in response.chords[property]) {
            console.log(`${property}: ${key}, ${response.chords[property][key]}`)

            if (response.chords[property][key].length === (numNotes*2-1)) {
                for (let i = 0; i < numNotes; i++) {
                    if (!response.chords[property][key].includes(allNotes[i])) {
                        break;
                    }
                    console.log("HIT!!!");
                    console.log(`${property} ${key}`);
                }

                if (response.chords[property][key].includes(first_note) && response.chords[property][key].includes(second_note) && response.chords[property][key].includes(third_note) && response.chords[property][key].length === 5) {
                    console.log("HIT!!!");
                    console.log(`${property} ${key}`);
                }
            }
        }
    }

}

// 
//API Documentation: (no key required)   https://api.uberchord.com/
// $.ajax({
//     url:"http://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=A+F%23+Eb",
//     method: "GET"
// }).then(function(response){
//     console.log(response);
// })


// activates the hamburger menu for external links in NAV bar.
$(document).ready(function(){
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


