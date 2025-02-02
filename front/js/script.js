fetch("http://localhost:3000/api/products") // Requête pour récupérer les json dans Product.js
  .then(res => res.json())
  .then(json => displayProducts(json));
  
const displayProducts = (products) => { 
  products.forEach((product) => displayProduct(product)); // Affiche chaque product de products
};

const displayProduct = (product) => { // Insère les "item" dans items 
  const items = document.getElementById("items");
  const item = document.createElement("a");
  items.append(item);
  item.setAttribute("href", "./product.html?id=" + product._id); // Ajoute lien vers page article
    
  const createArticle = () => {
    const article = document.createElement("article"); // Insère l'élément article dans item
    item.append(article);
    
    const createImg  = () => {
      const img = document.createElement("img"); // Insère img avec ses attributs (description/alt et url de l'image)
      img.setAttribute("alt", product.altText);
      img.setAttribute("src", product.imageUrl);
      article.appendChild(img); // Insère img dans article
    };
    createImg();

    const createName = () => {
    const productName = document.createElement("h3"); 
    productName.classList.add("productName");
    productName.textContent = product.name;
    article.appendChild(productName);// Insère le titre de l'article
    };
    createName();

    const createDescription = () => {
    const productDescription = document.createElement("p"); 
    productDescription.classList.add("productDescription");
    productDescription.textContent = product.description;
    article.appendChild(productDescription); // Insère la description
    };
    createDescription();
  };
  createArticle();
};


