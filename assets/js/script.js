//initialize firebase
var config = {
  apiKey: "AIzaSyAMEdAMQK64jfUY4aaDMGknPAxNjhzT0Rs",
  authDomain: "fir-assignment-9ae6d.firebaseapp.com",
  databaseURL: "https://fir-assignment-9ae6d.firebaseio.com",
  projectId: "fir-assignment-9ae6d",
  storageBucket: "fir-assignment-9ae6d.appspot.com",
  messagingSenderId: "646479413326"
};
firebase.initializeApp(config);

var database = firebase.database();



// button input for train data
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#train-name-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");

  // object for train data inputs
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFreq,
  };

  database.ref().push(newTrain);

  alert("New train schedule added");

  //clear input boxes
  $("#train-name-input").val("");
  $("#start-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});

// add to the firebase and to appropriate rows
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainStart = childSnapshot.val().start;
  var trainFreq = parseInt(childSnapshot.val().frequency);
  var trainDest = childSnapshot.val().destination;

  // first train times
  var firstTrainTime = moment(trainStart, "HH:mm").subtract(1, "years");
  

  // diff between times
  var diffTime = moment().diff(moment(firstTrainTime), "minutes");

  // time remaining before arrival
  var tRemainder = diffTime % trainFreq;
  //console.log(tRemainder);

  // minutes until info
  var tMinutesUntilTrain = (trainFreq - tRemainder);

  // next train info
  var nextTrain = moment().add(tMinutesUntilTrain, "minutes").format("HH:mm");

  //add input info to table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesUntilTrain + "</td></tr>");

  // console checks
  console.log(firstTrainTime);
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFreq);
  console.log(trainStart);
});