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



//Ebay Ajax call 
$(document).on("click", "#pokebtn", function (event) {
  event.preventDefault();
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var appId = "stevenre-p-PRD-1ef6a212e-d2503091";
  var queryURL = "https://" + cors_api_host + "/open.api.ebay.com/shopping?callname=FindProducts&responseencoding=XML&appid=" + appId + "&siteid=0&version=967&QueryKeywords=harry%20potter&AvailableItemsOnly=true&MaxEntries=2";
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    var results = response.data;
    console.log(response);
  });
  
  // var input = $("#pokemonebay").val();
  // topics.push(input);
  // $("#pokemonebay").val("");
  // genButtons();

})

genButtons();

//PokemonTCG 
$(document).on("click", ".top-genButtons", function () {
  $(".giphy-section").empty()
  var title = $(this).attr("data-value");
  console.log("title: " + title)
  //var apiKey = "Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf";
  var queryURL = "https://api.pokemontcg.io/v1/cards>"

  // Ajax call 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    console.log(results);
  });
})