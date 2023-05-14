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
      return `
    <div class="item" id=item-id-${id}>
        <img
      width="200"
      src="${imageSrc}"
      alt="${name}"/>
    <div class="details">
      <h3>${productLink}</h3>
      <div class="brand-like" id="brand-like">
        <a href="${productLinkHref}">${brand}</a> 
        <input type="checkbox" id="heart">
        <label for="heart">&#9829</label>
      </div>
      <p>
        ${description}
      </p>
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
