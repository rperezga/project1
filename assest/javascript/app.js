//Javascript for checklist.html
var myNodelist = document.getElementsByTagName("LI");
for(var i = 0; i < myNodelist.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
for(var i = 0; i < close.length; i++){
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev){
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement(){
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === ''){
        console.log("Write something");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for(i = 0; i < close.length; i++){
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
//end javascript for checklist.html

//API for Hurricane

// Adding click event listen listener to all buttons
$(document).on("click", "#track", function() {
    // Grabbing and storing the data from Hurricane tracking

 
  const searchType = 'random';

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.aerisapi.com/tropicalcyclones/closest?p=chanhassen,mn&radius=1300mi&filter=all&limit=1&format=json&client_id=5MQ1RvB0ZRonDrmxEfyPq&client_secret=tvg7OeULoGZ8zMJhKD6MimPUerXrY2gli9EjtMT4";
      console.log(queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After data comes back from the request
    .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

          // Creating and storing a div tag
          var hcane = $("<div class='line1'>");

          // Creating a paragraph tag with the result item's rating
          var p = $(".line1").text(results);
          
            

          
          
      });
  });
  // end hurricane Tracker API