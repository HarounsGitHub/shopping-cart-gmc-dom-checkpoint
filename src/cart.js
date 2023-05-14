let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// console.log(shopItemsData);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        // console.log(x);
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let price = parseFloat(search.price.replace("$", ""));
        // console.log(search);
        return `
            <div class="cart-item">
              <img width="100" src="${search["image-src"]}" alt="" />
           <div class="details">
           <div class="title-price-x">
           <h4 class="title-price">
             <p>${search.name}</p>
             <p class="cart-item-price">${search.price}</p>
           </h4>
           <i onclick="removeItem(${id})" class="cart bi bi-x-lg"></i>
       </div>
       <div style="border-top: 1px solid rgb(209, 209, 209);"></div>

       <div class="buttons">
           <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
           <div id=${id} class="quantity">${item}</div>
           <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
       </div>
       <h3>$ ${(parseFloat(price) * item).toFixed(2)}</h3>
       </div>

              </div>
            `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `<div class="empty">
      <h2>Cart is empty!</h2>
      <img src="images/empty-cart.png" width="200" alt="cart is empty" />
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      <div>
      `;
  }
};
generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  /* generateCartItems() is invoqued here so <h3> ${item * search.price}</h3> 
can work correctly using the updated data
*/
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  /* the line above runs when the condition item ==0, 
  so the item will be removed automatically that's why generateCartItems() is invoqued here 
   and also ${item * search.price} would work correctly
*/
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

  // live displaying of the total bill
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();

  // live substracting of removed item off the total bill
  TotalAmount();

  // live subsctructing the item from the cart icon
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();

  // live subsctructing the item from the cart icon
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let price = parseFloat(search.price.replace("$", ""));
        return item * price;
      })
      .reduce((x, y) => x + y, 0);
    console.log(amount);
    label.innerHTML = `
    <h2 class="bill">Total Bill : $${amount.toFixed(2)}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
