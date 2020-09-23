//API Documentation: (no key required)   https://api.uberchord.com/
// $.ajax({
//     url:"http://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=A+F%23+Eb",
//     method: "GET"
// }).then(function(response){
//     console.log(response);
// })


// click events with color class added.
$("#keyboard").on("click", ".key", function(e) {
    e.preventDefault();
    let key = $(this);
    console.log(key);
    if(key.attr("data-active") === "false") {
        key.attr("data-active","true");
    }
    else key.attr("data-active","false");
})


