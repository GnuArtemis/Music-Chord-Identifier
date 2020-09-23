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

}

// 
//API Documentation: (no key required)   https://api.uberchord.com/
// $.ajax({
//     url:"http://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=A+F%23+Eb",
//     method: "GET"
// }).then(function(response){
//     console.log(response);
// })


// click events with color class added.
// TODO: add calls to API when ready
$("#a").on("click", function(){
    $("#a").addClass("aColor");
})
$("#aSh").on("click", function(){
    $("#aSh").addClass("aShColor")
})
$("#b").on("click", function(){
    $("#b").addClass("bColor")
})
$("#c").on("click", function(){
    $("#c").addClass("cColor")
})
$("#cSh").on("click", function(){
    $("#cSh").addClass("cShColor")
})
$("#d").on("click", function(){
    $("#d").addClass("dColor")
})
$("#dSh").on("click", function(){
    $("#dSh").addClass("dShColor")
})
$("#e").on("click", function(){
    $("#e").addClass("eColor")
})
$("#f").on("click", function(){
    $("#f").addClass("fColor")
})
$("#fSh").on("click", function(){
    $("#fSh").addClass("fShColor")
})
$("#g").on("click", function(){
    $("#g").addClass("gColor")
})
$("#gSh").on("click", function(){
    $("#gSh").addClass("gShColor")
})

