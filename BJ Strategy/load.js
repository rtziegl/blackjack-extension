const LOAD_TIMEOUT = setTimeout(showPage, 1700);
var seconds = 0;


function showPage() {
  $(document).ready(function(){
    $(".loading_screen").fadeOut();
  });
  //document.getElementById("loading_page").style.display= "none";
  document.getElementById("app_window").style.display = "block";
}

/*
function incrementSeconds(){
  seconds += 1;
}

chrome.windows.onFocusChanged.addListener(function(window) {
    var cancel = setInterval(incrementSeconds, 1000);
    if (cancel > 160){
      document.getElementById("loading_page").style.display = "block";
      LOAD_TIMEOUT;
      showPage()
    }
    else {
      showPage()
    }

});*/
