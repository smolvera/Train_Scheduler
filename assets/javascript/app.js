
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaq9I9uRLHkXPypB5Ud7zItKzw8_398Yc",
    authDomain: "train-scedule-89660.firebaseapp.com",
    databaseURL: "https://train-scedule-89660.firebaseio.com",
    projectId: "train-scedule-89660",
    storageBucket: "",
    messagingSenderId: "680547100762"
  };
  firebase.initializeApp(config);

//   sets the variable database equal to firebase database and calls the function
  var database = firebase.database();

  console.log(database);

//   This function prevents the submit button from refreshing the page when clicked
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
  

// These variables grab user input
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var trainTime = moment($("#time").val().trim(), "hh:mm").format("X");
var frequency = moment($("#frequency").val().trim());

// testing and debugging
console.log(trainTime, "15:00");
console.log(frequency, "35");

// variable is created to temporarialy hold the input data
var newTrain = {
  name: trainName,
  destination: destination,
  time: trainTime,
  frequency: frequency
};

//  Uploads new train data to the database
database.ref().push(newTrain);

// logs new input to the console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

// alert that new information was added successfully
alert("New Train Schedule was Sucessfully Added!");

// Clears the current input fields
$("#trainName").val("");
$("#destination").val("");
$("#trainTime").val("");
$("#frequency").val("");
});

// Firebase event for adding train info to its database and current train schedule
database.ref().on("child_added", function(childSnapshot, prevChildKey){

  // logs a snapshot of the info entered onto the console
  console.log(childSnapshot.val());

  // Snapshot being stored into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // testing and debugging by logging to console
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  // formates the time variable to military time HH:mm
  var timeFormat = moment(trainTime, "hh:mm").subtract(1, "years");
  console.log(timeFormat);

  // Current Time and call moment library
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // calculates the minutes away using math equations (ended here)
  var timeDiff = moment().diff(moment(timeFormat), "minutes");
  console.log("Difference in Time: " + timeDiff);

  // convert the remainder
  var tRemainder = timeDiff % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var minutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  // calulates the next arrival time using math equations
  var nextArrival = moment().add(minutesTillTrain, "minutes").format("hh:mm A");
  console.log(nextArrival);

  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesTillTrain + "</td><td>");
});