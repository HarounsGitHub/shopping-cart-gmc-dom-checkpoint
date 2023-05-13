let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// window.onload = function () {
//   increment();
//   decrement();
//     update();
// };

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
      return `<div class="item" id=item-id-${id}>
    <img
      width="200"
      src="${imageSrc}"
      alt="${name}"
    />
    <div class="details">
      <h3>${productLink}</h3>
      <div class="brand-like" id="brand-like">
        <a href="${productLinkHref}">${brand}</a> <i class="bi bi-heart"></i>
      </div>
      <p>
        ${description}
      </p>
      <div class="price-quantity">
        <h2>${price}</h2>
        <div class="buttons">
          <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
          <div id=${id} class="quantity">
          ${search.item === undefined ? 0 : search.item}
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

  // console.log(basket);
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
  // console.log(basket);
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
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
