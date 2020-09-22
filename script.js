//API Documentation: (no key required)   https://api.uberchord.com/
$.ajax({
    url:"http://cors-anywhere.herokuapp.com/www.tofret.com/reverse-chord-finder.php?return-type=json&notes=A+F%23+Eb",
    method: "GET"
}).then(function(response){
    console.log(response);
})
