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

function fetchKantoPokemon() {
  var containerDiv = document.getElementById("pokemonfacts");
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(response => response.json())
    .then(function (allpokemon) {

      allpokemon.results.forEach(function (pokemon) {

        fetchPokemonData(pokemon);

      })

    })

}

function fetchPokemonData(pokemon) {

  let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 

  //Example: https://pokeapi.co/api/v2/pokemon/1/"

  fetch(url)

    .then(response => response.json())

    .then(function (pokeData) {

      renderPokemon(pokeData)

    })

}

function renderPokemon(pokeData) {
  console.log("renderPokemon: ", pokeData)

  let allPokemonContainer = document.getElementById('pokemonfacts');

  let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}

  pokeContainer.classList.add('ui', 'card');


  console.log("before create", pokeData.id, pokeContainer)
  createPokeImage(pokeData.id, pokeContainer);



  let pokeName = document.createElement('h4')

  pokeName.innerText = pokeData.name



  let pokeNumber = document.createElement('p')

  pokeNumber.innerText = `#${pokeData.id}`



  let pokeTypes = document.createElement('ul') //ul list will hold the pokemon types





  createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one



  pokeContainer.append(pokeName, pokeNumber, pokeTypes);   //appending all details to the pokeContainer div

  allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards

}

function createTypes(types, ul) {

  types.forEach(function (type) {

    let typeLi = document.createElement('li');

    typeLi.innerText = type['type']['name'];

    ul.append(typeLi)

  })

}

function createPokeImage(pokeID, containerDiv) {

  let pokeImgContainer = document.createElement('div')

  pokeImgContainer.classList.add('image')



  let pokeImage = document.createElement('img')

  pokeImage.srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeID + ".png"



  pokeImgContainer.append(pokeImage);

  containerDiv.append(pokeImgContainer);

}
fetchKantoPokemon();


//Ebay Ajax call 
$(document).on("click", "#pokebtn", function (event) {
  event.preventDefault();
  var pokeName = $("#search-input").val().trim();
  // Ebay API Var
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var appId = "stevenre-p-PRD-1ef6a212e-d2503091";


  var queryURL = "https://cors-anywhere.herokuapp.com/open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=" + appId + "&siteid=0&version=967&QueryKeywords=" + pokeName + "+card&AvailableItemsOnly=true&MaxEntries=10";
  console.log(queryURL)

  // PokeAPI var
  // var queryURL1 = "https://api.pokemontcg.io/v1/cards?name=" + pokeName;
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
    var results = JSON.parse(response);
    // console.log(response)
    console.log(results);
    $("#ebayresults").empty()
    for (var i = 0; i < results.Product.length; i++) {
      var item = results.Product[i]
      console.log("--->", item)
      var imgplaceholder="https://i.pinimg.com/originals/31/e0/4b/31e04b88bc64fe9aa52a8c9b57cb0c6b.jpg"
      if (!item.StockPhotoURL){
        item.StockPhotoURL = imgplaceholder
      }
      var ebayCard = `<div class="card col-3 m-3" style="width: 18rem;">
<img src="${item.StockPhotoURL}" class="card-img-top ebaypic" alt="...">
<div class="card-body">
  <h5 class="card-title">Ebay Info</h5>
  <p class="card-text">${item.Title}.</p>
  <a href="${item.DetailsURL}" class="btn btn-primary">Go eBay</a>
</div>
</div>`

      $("#ebayresults").append(ebayCard)
    }
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