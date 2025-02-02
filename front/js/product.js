const itemId = new URL(location.href).searchParams.get("id"); // récupère l'id des produits disponibles

fetch("http://localhost:3000/api/products/" + itemId) // Requête pour récupérer les json dans Product.js et créer les url pour chaque id de produit
  .then((res) => res.json())
  .then((json) => displayProduct(json));

const displayProduct = (product) => {
  const createImg = () => {
    const img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    // img crée avec 2 attributs
    const itemImg = document.querySelector(".item__img");
    itemImg.append(img);
    // .itemImg crée , parent de img -> insère la photo de l'article
  };
  createImg();
  
  const itemTitle = document.querySelector("#title");
  itemTitle.textContent = product.name;
  // insère le name du produit dans #title
  
  const createPrice = () => {
    const itemPrice = document.querySelector("#price");
    itemPrice.textContent = product.price;
    // insère le price du produit dans #price
  };
  createPrice();

  const createDecsription = () => {
    const itemDescription = document.getElementById("description");
    itemDescription.textContent = product.description;
    // insère la description du produit dans #description
  };
  createDecsription();

  const createColors = () => {
    const itemColors = document.getElementById("colors"); // pointe vers #colors
    const colorsList = product.colors;
    for (let i = 0; i < colorsList.length; i++) {
      // Pour chaque élément de colorsList, crée une ligne dans la liste déroulante
      const colorOption = document.createElement("option");
      // chaque ligne de la liste déroulante est une option
      colorOption.textContent = colorsList[i]; // ajoute toutes les options disponibles à la liste
      itemColors.appendChild(colorOption); // colorOption est créée en tant qu'enfant d'itemColors (pour chaque élément de la liste)
    }
  };
  createColors();

  const addToCart = document.querySelector("#addToCart");
  // lors du click, les valeurs de colors et quantity sont verifiées (non nulles)
  if (addToCart != null) {
    addToCart.addEventListener("click", () => {
      const itemColor = document.querySelector("#colors").value;
      const itemQuantity = parseInt(document.querySelector("#quantity").value);
      // parseInt permet de récupérer un nombre entier au lieu d'une string
      if (itemColor == null || itemColor === "" || itemQuantity == null || itemQuantity == 0) {
        alert("Veuillez sélectionner une couleur ET une quantité, SVP.");
        // alerte en cas d'élément color ou quantity nul
        return; // empêche la redirection vers la page panier
      }

      const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
      // transforme le panier JSON en objet

      const existingItem = cartContent.findIndex((itemInCart) => itemInCart.id == itemId && itemInCart.color == itemColor); // verifie si l'id et la color sont identiques à un article déjà existant dans le panier

      if (existingItem === -1) {
        // quand l'article n'existe pas encore, on récupère ses datas
        const dataItem = {
          // récupère l'id, la couleur, la quantité, ...
          id: itemId,
          color: itemColor,
          quantity: itemQuantity,
        };
        cartContent.push(dataItem);
        // ajoute une nouvelle ligne pour l'article dans le tableau s'il n'y est pas déjà présent
      } else {
        // si l'article est déjà présent dans le panier, on augmente seulement la quantité de l'article existant
        cartContent[existingItem].quantity += itemQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(cartContent));
      // transforme le panier objet en string JSON
      if (confirm("L'article " + itemTitle.textContent + "a été ajouté au panier (qnté : " + itemQuantity  + ", couleur : " + itemColor + ")\nPour aller au panier, cliquez sur OK.\nPour continuer vos achats, cliquez sur Annuler")) { // demande de confirmation pour aller au panier
        window.location.href = "cart.html"; // redirige vers le panier
      }
      
    });
  }
};
