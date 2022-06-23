const element = document.getElementById("get-strat");	// Get element
element.style.visibility = "hidden";
const LOAD_TIMEOUT = setTimeout(showPage, 1700);
var seconds = 0;




function showPage() {
  $(document).ready(function(){
    $(".loading-screen").fadeOut();
  });
  //document.getElementById("loading_page").style.display= "none";
  document.getElementById("app-window").style.display = "block";
  element.style.visibility = "visible";
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
