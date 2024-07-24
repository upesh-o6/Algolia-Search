import algoliasearch from "algoliasearch";


const client = algoliasearch("R9AMYLA9GZ" , "6fe191142c4098248bac933871fdfbcb");
const index = client.initIndex("Upesh");


let data = [];
let resultsRootElements = document.querySelector('.results');

fetch('https://fakestoreapi.com/products').then(res => res.json()).then(json => {
    data = json;
    console.log("data is", data);
  });

document.querySelector('#SearchPlace').addEventListener('keyup', () => {
  let searchTerm = document.querySelector('#SearchPlace').value;
  let resultsArray =[]


  if(String(searchTerm).trim().length > 0){
    

    index.search(searchTerm).then(({hits})=>{
        renderProducts(hits)
    }) 
    .catch(err => {console.log(err);});
  }else{removeElements()}
});

function renderProducts(products) {
    removeElements()
  products.forEach(product=>{
    renderSingleProduct(product);
  })
}

 

function renderSingleProduct(product) {
  let resultDiv = document.createElement('div');
  let resultImage = document.createElement('img'); // Corrected element creation
  let resultTitle = document.createElement('h2'); // Corrected element creation
  let resultPrice = document.createElement('p');
  let resultButton = document.createElement('button'); // Corrected element creation

  resultImage.src = product.image;
  resultTitle.innerText = product.title;
  resultPrice.innerText = product.price;
  


   

  resultDiv.appendChild(resultImage);
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultPrice);
  resultDiv.appendChild(resultButton);

  resultButton.innerHTML = 'Purchase'

  resultDiv.className = 'result'

  resultsRootElements.appendChild(resultDiv);
}



function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
        prod.remove()
    })
}




function addNewProduct(){
    index.saveObject({
        objectID :92939,
        "id": 1,
        "title": "Cynohub <> React project",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",

        "price": 109.95,
        "description": "This an algolia based React project",
        "category":     "develpment",
        "rating": {
            "rate": 5,
            "count": 120
        }

    })
}
