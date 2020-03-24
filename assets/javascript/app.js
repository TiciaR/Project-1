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
function fetchKantoPokemon(){
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(allpokemon => console.log(allpokemon))
}
 fetchKantoPokemon();


//Ebay Ajax call 
$(document).on("click", "#pokebtn", function (event) {
  event.preventDefault();

  // Ebay API Var
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var appId = "stevenre-p-PRD-1ef6a212e-d2503091";
  var queryURL = "https://" + cors_api_host + "/open.api.ebay.com/shopping?callname=FindProducts&responseencoding=XML&appid=" + appId + "&siteid=0&version=967&QueryKeywords=" + pokeName + "&AvailableItemsOnly=true&MaxEntries=2";
  var pokeName = $("#search-input").val().trim();
  // PokeAPI var
  var queryURL1 = "https://api.pokemontcg.io/v1/cards?name=" + pokeName;
  // user input
  var newPokemon = {
    name: pokeName,
  };
  database.ref().push(newPokemon);
  console.log(newPokemon.name);

  //ebay ajax get method
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    var results = response.data;
    console.log(response);
  });

  //pokeAPI
  // $.ajax({
  //   url: queryURL1,
  //   method: "GET"
  // }).then(function (response) {
  //   var results = response.data;
  //   console.log(results);
  // });



})



// //PokemonTCG 
// $(document).on("click", "#pokebtn", function () {
//   event.preventDefault();
//     var title = $(this).attr("data-value");
//   console.log("title: " + title)
//   //var apiKey = "Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf";
  

//   // Ajax call 

// })