// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCyLmZMarsDDgDgkrPXwPFgXPr26MJhB7Y",
    authDomain: "pokemon-bay.firebaseapp.com",
    databaseURL: "https://pokemon-bay.firebaseio.com",
    projectId: "pokemon-bay",
    storageBucket: "pokemon-bay.appspot.com",
    messagingSenderId: "724641227290",
    appId: "1:724641227290:web:bb994ef0c18873aac467a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Reference database
  var database = firebase.database();

  // Variables for onClick
  var name;
  var one;
  var two;

  $(document).on("click", ".btn-primary", function (event) {
    event.preventDefault();
    var input = $("#input").val();
    topics.push(input);
    $("#input").val("");
    genButtons();

  })
  genButtons();
  $(document).on("click", ".top-genButtons", function () {
  $(".giphy-section").empty()
    var title = $(this).attr("data-value");
    console.log("title: " + title)
    var apiKey = "Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + apiKey + "&limit=10&rating<=pg"

// Ajax call 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
var results = response.data;
console.log(results);
})