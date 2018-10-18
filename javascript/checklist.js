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

    var logged = localStorage.getItem("logged");
    //var logged = "true";

    if (logged == "false") {
        $("#login").attr("hidden", true);
        $("#nologin").attr("hidden", false);
    } else {
        $("#login").attr("hidden", false);
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
    });

})