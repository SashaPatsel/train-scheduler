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

  var nextTrain = futureTrain(snapshot.val().frequency, snapshot.val().time);
  var times = calculateArrivalTime(nextTrain);
  var westernTime = times[0];
  var minutesAway = times[1];


  var newTableRow = $("<tr>");

  var newTableData =
  $("<td>" + snapshot.val().name + "</td>" +
  "<td>" + snapshot.val().destination + "</td>" +
  "<td>" + snapshot.val().frequency + "</td>" +
  "<td>" + westernTime + "</td>"+
  "<td>" + minutesAway + "</td>");


  newTableRow.append(newTableData);
  $("#train-row").append(newTableRow);

});

function futureTrain(freq, initTime) {

  var timeMoment = moment(initTime, "HH:mm");

  var endDay = moment("23:59", "HH:mm");

  var timetable = [];

  for (var i = timeMoment; i.isSameOrBefore(endDay); i.add(freq, "minutes")) {
    var times = i.format("HH:mm");
    timetable.push(times);
  }

  var now = moment();

  var futureTrains = [];

  for (var i = 0; i < timetable.length; i++) {
    if (moment(timetable[i], "HH:mm").isAfter(now)) {
      futureTrains.push(timetable[i]);
    }
  }

  var nextTrain = futureTrains[0];

  return nextTrain;

}

function calculateArrivalTime(nextTrain) {
  var now = moment();
  var minutesAway = moment(nextTrain, "HH:mm").diff(now, "minutes");
  var westernTime = moment(nextTrain, "HH:mm").format("h:mm a");
  return [westernTime, minutesAway];
}

