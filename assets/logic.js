// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtgduEj5j2h7F_GNVMswWHm6tn9jcHrKs",
    authDomain: "train-scheduler-a35c0.firebaseapp.com",
    databaseURL: "https://train-scheduler-a35c0.firebaseio.com",
    projectId: "train-scheduler-a35c0",
    storageBucket: "train-scheduler-a35c0.appspot.com",
    messagingSenderId: "162033467046"
};
firebase.initializeApp(config);

var database = firebase.database();

var current = moment().format("YYYY-MM-DD");
var array = current.split("-");
var years = parseInt(array[0]);
var months = parseInt(array[1]);
var days = parseInt(array[2]);

//Push to firebase
$("#submit-train").on("click", function() {

    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFreq = $("#train-freq").val().trim();


    database.ref().push({
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    })

});


//Append a new train and save to firebase every time a manager adds one
database.ref().on("child_added", function(snapshot) {

    var newRow = $("<tr>");

    var freq = snapshot.val().frequency;

    var dayEnd = moment("23:59", "HH:mm");

    var firstMoment = moment(snapshot.val().time, "HH:mm");


    var time = [];

    // for (var i = firstMoment; i.isSameOrBefore(dayEnd); i.add(freq, "minutes")) {



    //     time.push(i.format("HH:mm"));
    // }
    var now = moment().format("hh,mm")

    var futureTimes = [];

    for (var i = 0; i < time.length; i++) {

        if (moment(time[i], "HH:mm").isAfter(now)) {
            futureTimes.push(time[i]);
        }
    }

    var nextTrain = futureTimes[0];

    var minutesAway = moment(nextTrain, "hh:mm").diff(now, "minutes");

    var showTime = moment(nextTrain, "HH:mm").format("h:mm a");

    newRow.append("<td>" + snapshot.val().name + "</td>");
    newRow.append("<td>" + snapshot.val().destination + "</td>");
    newRow.append("<td>" + snapshot.val().frequency + "</td>");
    newRow.append("<td>" + showTime + "</td>");
    newRow.append("<td>" + minutesAway + "</td>");

    $("#train-row").append(newRow);
});