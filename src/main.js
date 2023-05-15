let shop = document.getElementById("shop");

// our selection of items will be pushed into a basket
// let basket = [];
//we parse the data that we have saved locally or just initiate with an empty array if no data is found
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let {
        id,
        name,
        brand,
        "image-src": imageSrc,
        description,
        price,
        "product-link": productLink,
        "product-link-href": productLinkHref,
      } = x;
      let search = basket.find((x) => x.id === id) || [];

      // Get the heart state data from local storage if available or set to set it to default
      let storedValue = localStorage.getItem(`heart-${id}`);
      let isHeartFilled = storedValue ? storedValue === "true" : false;
      let heartIconClass = isHeartFilled ? "hidden" : "";
      let filledHeartIconClass = isHeartFilled ? "" : "hidden";

      return `
    <div class="item" id=item-id-${id}>
    <img width="200" src="${imageSrc}" alt="${name}"/> 
        <div class="details">
      <h3>${productLink}</h3>
      <div class="brand-like" id="brand-like">
        <a href="${productLinkHref}">${brand}</a> 
        <button class="button-solid" onclick="toggleHeartIcon('${id}')" data-item-id="${id}">
  <i class="bi bi-heart ${heartIconClass}"></i>
  <i class="bi bi-heart-fill ${filledHeartIconClass}"></i>
</button>

        </div>
      <p>
        ${description}
      </p>
      <div style="border-top: 1px solid rgb(209, 209, 209);"></div>
      <div class="price-quantity">
        <h2>${price}</h2>
        <div class="buttons">
          <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
          <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }
          </div>
          <i class="bi bi-dash-lg" onclick="decrement(${id})"></i>
        </div>
      </div>
    </div>
  </div>
`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  // console.log(id);
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
  // update(selectedItem.id);
  // console.log(basket);
  // localStorage.setItem("dawg", basket);

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  // to avoid negative values
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket);

  update(selectedItem.id);
  // to avoid clutter in localStorage of id's with item=0
  basket = basket.filter((x) => x.item !== 0);
  // update(selectedItem.id); // i couldn't decrement to zero here because of the previous line statement
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  // console.log(cartIcon);
  // cartIcon.innerHTML = 100;
  // console.log(basket.map((x) => x.item));

  // console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0));
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// so everytime the web page loads calculation() runs & the cartAmount won't be initiated to 0
calculation();

// toggle button from heart to heart-fill icon & vise versa and save the state to local storage

let toggleHeartIcon = (id) => {
  // get the button element containing the heart icons
  let buttonElement = document.getElementById(`item-id-${id}`);
  // get the heart and filled heart icons
  let heartIcon = buttonElement.querySelector(".bi-heart");
  let filledHeartIcon = buttonElement.querySelector(".bi-heart-fill");

  // toggle the visibility of the heart icons
  heartIcon.classList.toggle("hidden");
  filledHeartIcon.classList.toggle("hidden");

  // determine if the heart is filled based on the visibility of the filled heart icon
  let isHeartFilled = !filledHeartIcon.classList.contains("hidden");

  // get the array of heart id's from local storage or create an empty array if it doesn't exist
  let heartIds = JSON.parse(localStorage.getItem("heart-ids")) || [];

  // add / remove the current id from the array based on the heart state
  if (isHeartFilled) {
    //add id if it's not already present in the array
    if (!heartIds.includes(id)) {
      heartIds.push(id);
    }
  } else {
    // remove the id if it's present in the array
    let index = heartIds.indexOf(id);
    if (index !== -1) {
      heartIds.splice(index, 1);
    }
  }

  // update the heart IDs array in local storage
  localStorage.setItem("heart-ids", JSON.stringify(heartIds));
};
