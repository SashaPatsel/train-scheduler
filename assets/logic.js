
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
// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    var highBidder = snapshot.val().highBidder
    var highPrice = parseInt(snapshot.val().highPrice)


    // Change the HTML to reflect the stored values
      $("#highest-bidder").text(highBidder);
      $("#highest-price").text("$" + snapshot.val().highPrice);

    // Print the data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    // Print the data to the console.
    console.log(highPrice);
    console.log(highBidder);

  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
    bidderPrice = parseInt($("#bidder-price").val().trim());
    bidderName = $("#bidder-name").val().trim();

  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
     database.ref().set({
        highPrice: bidderPrice,
        highBidder: bidderName
    });

    // Log the new High Price
    console.log(highPrice);

    // Store the new high price and bidder name as a local variable
    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);
    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(bidderName);
    $("#highest-price").text("$" + bidderPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
