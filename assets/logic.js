
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

  var trainName = "";
  var trainDest = "";
  var trainTime = "";
  var trainFreq = "";


  $("#submit-train").on("click", function() {

      event.preventDefault();

      trainName = $("#train-name").val().trim();
      trainDest = $("#destination").val().trim();
      trainTime = $("#train-time").val().trim();
      trainFreq = $("#train-freq").val().trim();


      database.ref().push({
          name: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      })

  });

  database.ref().on("child_added", function(snapshot) {

      var newRow = $("<tr>");

      var frequencyCheck = snapshot.val().frequency;
      var firstTime = snapshot.val().time;

      var firstMoment = moment(firstTime, "HH:mm");

      var dayEnd = moment("23:59", "HH:mm");

      var timesArray = [];

      for (var i = firstMoment; i.isSameOrBefore(dayEnd); i.add(frequencyCheck, "minutes")) {

          var times = i.format("HH:mm");

          timesArray.push(times);
      }

      var currentTime = moment("20:52", "HH:mm");

      var futureArray = [];

      for (var i = 0; i < timesArray.length; i++) {

          if (moment(timesArray[i], "HH:mm").isAfter(currentTime)) {
              futureArray.push(timesArray[i]);
          }
      }

      var nextTrain = futureArray[0];

      var minutesAway = moment(nextTrain, "HH:mm").diff(currentTime, "minutes");

      var showTime = moment(nextTrain, "HH:mm").format("h:mm a");

      newRow.append("<td>" + snapshot.val().name + "</td>");
      newRow.append("<td>" + snapshot.val().destination + "</td>");
      newRow.append("<td>" + snapshot.val().frequency + "</td>");
      newRow.append("<td>" + showTime + "</td>");
      newRow.append("<td>" + minutesAway + "</td>");

      $("#train-row").append(newRow);
  });