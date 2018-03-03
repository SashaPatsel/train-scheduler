
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

 