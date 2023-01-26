const getOrderId = () => { // pour récupérer l'orderId dans URLParams
   const windowSearch = window.location.search;
   const urlParams = new URLSearchParams(windowSearch);
   return urlParams.get("orderId"); // renvoie l'orderId récupéré dans l'url
   }
const orderId = getOrderId();
   
const displayOrderId = () => { // insère l'orderId dans #orderId pour affichage sur la page
   const orderIdItem = document.getElementById("orderId"); // pointe vers #orderId
     orderIdItem.textContent = orderId; // insère orderId
}
displayOrderId();

const removeCartItems = () => { // pour vider le cache qprès confirmation de la commande
   const cartItems = window.localStorage;
   cartItems.clear();
}
removeCartItems();