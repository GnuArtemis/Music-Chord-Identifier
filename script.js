//API Documentation: (no key required)   www.tofret.com/
var first_note = "B";
var second_note = "G";
var third_note = "E";
var numNotes = 3;

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
            if(response.chords[property][key].includes(first_note)&&response.chords[property][key].includes(second_note)&&response.chords[property][key].includes(third_note)&&response.chords[property][key].length===5) {
                console.log("HIT!!!");
                console.log(`${property} ${key}`);
            }
        }
    }

    // newList.forEach(function (element, index) {
    //     var justChord = Object.values(element[1]);
    //     console.log(justChord);
    //     // justChord.forEach(e => {
    //     //     if (e === `${first_note} ${second_note} ${third_note}`) {
    //     //         console.log("Hit!")
    //     //         console.log(Object.keys(element[1])[index]);
    //     //         // return [e, Object.keys(element[1])[index]];
    //     //     }
    //     // });


    // });
}


// $.ajax({
//     url:"https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=A+F%23+D",
//     method: "GET"
// }).then(function(response){
//     // console.log("hello world")
//     response=JSON.parse(response);

//     console.log(response);

//     // if(first_note === "A") {

//     // }
// })

// $.ajax({
//     url:"https://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=G+B",
//     method: "GET"
// }).then(function(response){
//     // console.log("hello world")
//     response=JSON.parse(response);

//     console.log(response);

//     // if(first_note === "A") {

//     // }
// })


// 