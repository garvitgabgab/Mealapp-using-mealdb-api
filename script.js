const inputBox = document.querySelector(".inputBox");
const inputBtn = document.querySelector(".inputBtn");
const result = document.querySelector(".result");
const content = document.querySelector(".content");
const closeBtn = document.querySelector(".recipeclose");


//function te fetch information of recipe
const fetchMeal = async (query) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response2 = await response.json();
  response2.meals.forEach(meal => {
    const newdiv = document.createElement('div');
    newdiv.classList.add('recipe');
    newdiv.innerHTML = `
    <img src = "${meal.strMealThumb}">
    <h2>${meal.strMeal}</h2>
    <p>${meal.strCategory} </p>
    `
    const recipeBtn = document.createElement('button');
    recipeBtn.textContent = "Recipe";
    newdiv.appendChild(recipeBtn);
    //
    recipeBtn.addEventListener('click', () => {
      openRecipe(meal);
    });

    // to add dish to your fav section

    const FavBtn = document.createElement('button');
  FavBtn.textContent = "Add tofavs";
  newdiv.appendChild(FavBtn);
  FavBtn.addEventListener('click', () => {
    const ul = document.querySelector("ul");
    
     //console.log("working");
    // addRemoveToFavList(meal);
    var li = document.createElement("li");
    const closeButton = document.createElement('button');
    closeButton.textContent = '❌';
    closeButton.style.marginLeft = '6px';
    closeButton.onclick = function() {
        li.remove();
    };
   
    li.appendChild(document.createTextNode(`${meal.strMeal}`));
    li.appendChild(closeButton);
    ul.appendChild(li);
    // console.log(`${meal.strMeal}`);
  });
  const closeButton = document.createElement('button');
  closeButton.textContent = '\u2718'; // Use Unicode representation of ✘ symbol
    
    closeButton.addEventListener('click', () => {
      li.remove();
      
      ul.appendChild(closeButton);
    });
    result.appendChild(newdiv);
    //console.log(response.meals);
  });
  console.log(response);
  

};

//

const fetchMaterial = (meal) => {
  let itemList = "";
  for(let i = 1; i<17; i++){
    const Ingedrients = meal[`strIngredient${i}`];
    if(Ingedrients){
      const amount = meal[`strMeasure${i}`];
      itemList += `<li>${amount} ${Ingedrients}</li>` 
    }
    else{
      break;
    }
  }
  return itemList;
};


const openRecipe = (meal) => {
 content.innerHTML = `
 <h2 class ="dishName">${meal.strMeal}</h2>
 <h3>Ingedrients</h3>
 <ul class = "itemList">${fetchMaterial(meal)}</ul>
 <div> 
  <h3>Instructions: </h3>
  <p class = "Instruction">${meal.strInstructions}</p>
 </div>

 `
 
 content.parentElement.style.display = "block";
};

// const addRemoveToFavList = (meal) => {
//   content.innerHTML = `
//   <h2 class ="dishName">${meal.strMeal}</h2>
//   <h3>Ingedrients</h3>
//   <ul class = "itemList">${fetchMaterial(meal)}</ul>
//   <div> 
//    <h3>Instructions: </h3>
//    <p class = "Instruction">${meal.strInstructions}</p>
//   </div>
 
//   `
  
//   content.parentElement.style.display = "block";
//  };
// const addRemoveToFavList = (meal) => {
//   const favs = document.querySelector("favs");
//   const favBtn = document.querySelector("collapsible");
//   favBtn.addEventListener("click", function(){

//   });
  
// };
function showFav() {
  document.getElementById("myDropdown").classList.toggle("show");
}

inputBtn.addEventListener('click', (e) =>{
  const mealName = inputBox.value.trim();
  fetchMeal(mealName);
 //console.log("heloo!");
 
 
});

closeBtn.addEventListener('click', () =>{
  content.parentElement.style.display = "none";
});

  
// function addRemoveToFavList(fav){
  
// }