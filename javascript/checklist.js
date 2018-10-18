$(function () {

    var config = {
        apiKey: "AIzaSyAtjgM-9GPkeCofL3SXRw6uCedoDQDuINg",
        authDomain: "hurricaneready-e1c88.firebaseapp.com",
        databaseURL: "https://hurricaneready-e1c88.firebaseio.com",
        projectId: "hurricaneready-e1c88",
        storageBucket: "hurricaneready-e1c88.appspot.com",
        messagingSenderId: "1012618278075"
    };

    firebase.initializeApp(config);

    const db = firebase.firestore();

    // var logged = localStorage.getItem("logged");
    var logged = "true";
    var ready = true;
    if (ready == false) {
        $("#readyElements").attr("hidden", true);
        $("#unreadyElements").attr("hidden", false);
        ready = true;
    } else {
        $("#readyElements").attr("hidden", false);
        $("#unreadyElements").attr("hidden", true);
        ready = false;
    }

    $("#pendingBtn").on("click", function (event) {
        event.preventDefault();

        if (ready == false) {
            $("#readyElements").attr("hidden", true);
            $("#unreadyElements").attr("hidden", false);
            ready = true;
        } else {
            $("#readyElements").attr("hidden", false);
            $("#unreadyElements").attr("hidden", true);
            ready = false;
        }
    })

    if (logged == "false") {
        $("#login").attr("hidden", true);
        $("#nologin").attr("hidden", false);
    } else {
        $("#login").attr("hidden", false);
        $("#name").text(localStorage.getItem("user"))
        $("#nologin").attr("hidden", true);
    }

    $("#googleLogin").on("click", function () {
        console.log('Tengo que ver si estoy login o no')
        provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                user = result.user;
                localStorage.setItem("logged", true);
                localStorage.setItem("user", user.displayName);
                localStorage.setItem("email", user.email);

                $("#login").attr("hidden", false);
                $("#nologin").attr("hidden", true);
            })
            .catch(console.log);
    });

    $("#logout").on("click", function () {
        firebase.auth().signOut();

        localStorage.setItem("logged", false);
        localStorage.setItem("user", "");
        localStorage.setItem("email", "");

        $("#login").attr("hidden", true);
        $("#nologin").attr("hidden", false);
        $("#name").text("");
    });

    db.collection("users").onSnapshot(doc => {
        $("#dataPending").text("");
        $("#dataReady").text("");

        doc.forEach(function (doc) {
            if (doc.data().email == "rperezga@gmail.com") {

                for (var key in doc.data()) {
                    var value = doc.data()[key]
                    console.log("KEY: " + key);
                    console.log("VALUE: " + value);

                    var rowElement = $("<tr>");
                    rowElement.addClass("elementData");

                    if (value == false) {
                        var colElement = $("<td>");
                        colElement.append(key);

                        var colChange = $("<td id='change'>");
                        colChange.append("<i class='fas fa-angle-double-right'></i>");
                        colChange.attr("data-id", doc.id);
                        colChange.attr("data-status", doc.data().status);
                        colChange.attr("data-element", doc.data().element);
                        colChange.attr("data-status", doc.data().status);
                        colChange.attr("data-user", doc.data().user);

                        var colErase = $("<td id='erase'>");
                        colErase.append("<i class='fa fa-trash'></i>");
                        colErase.attr("data-id", doc.id);

                        rowElement.append(colElement)
                            .append(colChange)
                            .append(colErase)

                        $("#dataPending").append(rowElement);
                    }


                }



                // if (doc.data().status == true) {
                //     var colDel = $("<td id='delete'>");
                //     colDel.append("<i class='fas fa-angle-double-left'></i>");
                //     colDel.attr("data-id", doc.id);
                //     colDel.attr("data-status", doc.data().status);
                //     colDel.attr("data-element", doc.data().element);
                //     colDel.attr("data-status", doc.data().status);
                //     colDel.attr("data-user", doc.data().user);

                //     rowElement.append(colElement)
                //         .append(colDel)

                //     $("#dataReady").append(rowElement);
                // } else {
                //     var colDel = $("<td id='delete' >");
                //     colDel.append("<i class='fas fa-angle-double-right'></i>");
                //     colDel.attr("data-id", doc.id);
                //     colDel.attr("data-status", doc.data().status);
                //     colDel.attr("data-element", doc.data().element);
                //     colDel.attr("data-status", doc.data().status);
                //     colDel.attr("data-user", doc.data().user);

                //     var colErase = $("<td id='erase'>");
                //     colErase.append("<i class='fa fa-trash'></i>");
                //     colErase.attr("data-id", doc.id);

                //     rowElement.append(colElement)
                //         .append(colDel)
                //         .append(colErase)

                //     $("#dataPending").append(rowElement);
                // }
            }
        })
    });



})