$(function () {

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
