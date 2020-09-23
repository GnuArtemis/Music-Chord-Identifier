
// activates the hamburger menu for external links in NAV bar.
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

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


