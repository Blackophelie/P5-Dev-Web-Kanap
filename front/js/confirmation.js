const getOrderId = () => { 
   const windowSearch = window.location.search;
   const urlParams = new URLSearchParams(windowSearch);
   return urlParams.get("orderId"); // renvoie l'orderId récupéré dans URLSearchParams
   }
const orderId = getOrderId();
   
const displayOrderId = () => { // insère l'orderId dans #orderId
   const orderIdItem = document.getElementById("orderId");
     orderIdItem.textContent = orderId;
}
displayOrderId();

const removeCache = () => {
   const cache = window.localStorage;
   cache.clear();
}
removeCache();