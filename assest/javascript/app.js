$(function () {

<<<<<<< HEAD
   var state = '';
   var gasType = '';
   var zip = '';
   var limit = 5;

   function submitReady() {
       if (gasType != '' && (state != '' || zip != '')) {
           $("#stationsSubmit").attr('disabled', false);
       } else {
           $("#stationsSubmit").attr('disabled', true);
       }
   }

   $("#selectState").on("click", function () {
       state = $("#selectState").val();
       submitReady();
   })

   $("#selectGasType").on("click", function () {
       gasType = $("#selectGasType").val();
       submitReady();
   })

   $("#inputZip").change("value", function () {
       zip = $("#inputZip").val();
       submitReady();
   })

   $("#selectLimit").on("click", function () {
       limit = $("#selectLimit").val();
   })

   $("#stationsSubmit").on("click", function (event) {
       event.preventDefault();

       if (state != '') {
           var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=" + gasType + "&state=" + state + "&limit=" + limit + "&api_key=gHMrq4MMgbBpXOPWPO6Cf6OqYK80OomuANhCPXMP&format=JSON"
       }

       if (zip != '') {
           var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=" + gasType + "&zip=" + zip + "&limit=" + limit + "&api_key=gHMrq4MMgbBpXOPWPO6Cf6OqYK80OomuANhCPXMP&format=JSON"
       }

       // Creates AJAX call for stations button being clicked
       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function (response) {
           $("#dataStations").text("");
           for (var i = 0; i < response.fuel_stations.length; i++) {

               var rowStation = $("<tr>");
               rowStation.addClass("stationsData");
               rowStation.attr("data-lat", response.fuel_stations[i].latitude);
               rowStation.attr("data-long", response.fuel_stations[i].longitude);
               rowStation.attr("data-address", response.fuel_stations[i].street_address + ', ' + response.fuel_stations[i].city + ' ' + response.fuel_stations[i].state + ', ' + response.fuel_stations[i].zip);

               var colName = $("<td>");
               colName.append(response.fuel_stations[i].station_name);

               var colAddress = $("<td>");
               colAddress.append(response.fuel_stations[i].street_address + ', ' + response.fuel_stations[i].city + ' ' + response.fuel_stations[i].state + ', ' + response.fuel_stations[i].zip);

               var colPhone = $("<td>");
               colPhone.append(response.fuel_stations[i].station_phone);

               var colHours = $("<td>");
               colHours.append(response.fuel_stations[i].access_days_time);

               var colMap = $("<td id='map'>");
               colMap.append("<i class='fas fa-map-marked-alt'></i>");
               colMap.attr("data-toggle", "modal");
               colMap.attr("data-target", "#modalMapStation");

               rowStation.append(colName)
                   .append(colAddress)
                   .append(colPhone)
                   .append(colHours)
                   .append(colMap)

               $("#dataStations").append(rowStation);

               console.log(response.fuel_stations[i])
           }
       })
   })

   $(document).on("click", "#map", function () {
       var lat = $(this).parent().attr("data-lat")
       var long = $(this).parent().attr("data-long")
       $("#stationAddress").text($(this).parent().attr("data-address"))

       console.log(lat + "  " + long)
   })

})
=======
    var state = '';
    var gasType = '';
    var zip = '';
    var limit = 5;
    var coordenates = '';

    function submitReady() {
        if (gasType != '' && (state != '' || zip != '')) {
            $("#stationsSubmit").attr('disabled', false);
        } else {
            $("#stationsSubmit").attr('disabled', true);
        }
    }

    $("#selectState").on("click", function () {
        state = $("#selectState").val();
        submitReady();
    })

    $("#selectGasType").on("click", function () {
        gasType = $("#selectGasType").val();
        submitReady();
    })

    $("#inputZip").change("value", function () {
        zip = $("#inputZip").val();
        submitReady();
    })

    $("#selectLimit").on("click", function () {
        limit = $("#selectLimit").val();
    })

    $("#stationsSubmit").on("click", function (event) {
        event.preventDefault();

        if (state != '') {
            var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=" + gasType + "&state=" + state + "&limit=" + limit + "&api_key=gHMrq4MMgbBpXOPWPO6Cf6OqYK80OomuANhCPXMP&format=JSON"
        }

        if (zip != '') {
            var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=" + gasType + "&zip=" + zip + "&limit=" + limit + "&api_key=gHMrq4MMgbBpXOPWPO6Cf6OqYK80OomuANhCPXMP&format=JSON"
        }

        // Creates AJAX call for stations button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#dataStations").text("");
            for (var i = 0; i < response.fuel_stations.length; i++) {

                var rowStation = $("<tr>");
                rowStation.addClass("stationsData");
                rowStation.attr("data-lat", response.fuel_stations[i].latitude);
                rowStation.attr("data-long", response.fuel_stations[i].longitude);
                rowStation.attr("data-address", response.fuel_stations[i].street_address + ', ' + response.fuel_stations[i].city + ' ' + response.fuel_stations[i].state + ', ' + response.fuel_stations[i].zip);

                var colName = $("<td>");
                colName.append(response.fuel_stations[i].station_name);

                // var colAddress = $("<td>");
                // colAddress.append(response.fuel_stations[i].street_address + ', ' + response.fuel_stations[i].city + ' ' + response.fuel_stations[i].state + ', ' + response.fuel_stations[i].zip);

                var colPhone = $("<td>");
                colPhone.append(response.fuel_stations[i].station_phone);

                var colHours = $("<td>");
                colHours.append(response.fuel_stations[i].access_days_time);

                var colMap = $("<td id='map'>");
                colMap.append("<i class='fas fa-map-marked-alt'></i>");
                colMap.attr("data-toggle", "modal");
                colMap.attr("data-target", "#modalMapStation");

                rowStation.append(colName)
                    // .append(colAddress)
                    .append(colPhone)
                    .append(colHours)
                    .append(colMap)

                $("#dataStations").append(rowStation);

                console.log(response.fuel_stations[i])
            }
        })
    })

    $(document).on("click", "#map", function () {
        localStorage.setItem("lat", $(this).parent().attr("data-lat"));
        localStorage.setItem("long", $(this).parent().attr("data-long"));

        var lat = localStorage.getItem("lat");
        var long = localStorage.getItem("long");

        $("#stationAddress").text($(this).parent().attr("data-address"))
        $("#mapView").html('<iframe src="showinmap.html" style="height: 430px; width: 100%"></iframe>');

        console.log(lat + "  " + long)
    })

    




})


//Javascript for checklist.html

var myNodelist = document.getElementsByTagName("LI");
for(var i = 0; i < myNodelist.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

//delete an item on the checklist
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

//add an item to checklist
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

//press "enter" key to submit
$("#myInput").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".addBtn").click();
    }
});

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
>>>>>>> d8b05afb1ea1a9c2439352fe63162713d32a6b43
