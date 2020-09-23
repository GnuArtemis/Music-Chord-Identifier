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

