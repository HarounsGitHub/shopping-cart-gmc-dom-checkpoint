let shop = document.getElementById("shop");

const shopItemsData = [
  {
    id: "fdfdgfgfgfgfgd",
    "product-link":
      "EveryYay  Blue Nautical Striped Nester Dog Bed(48)$39.99   Buy 2, Save 30% - Mix & Match",
    "product-link-href":
      "https://www.petco.com/shop/en/petcostore/product/everyyay-snooze-fest-blue-and-white-striped-nester-dog-bed",
    name: 'EveryYay Blue Nautical Striped Nester Dog Bed, 32" L X 24" W',
    brand: "EveryYay",
    price: "$39.99",
    "image-src": "images/EveryYay  Blue Nautical Striped Nester Dog Bed.avif",
    description:
      "The EveryYay Blue Nautical Striped Nester Dog Bed is a boat of comfort that'll rock your pup's world - especially if they love to curl up for the slumber pawty. Featuring a faux-shearling sleep surface that's irresistibly cozy, this dog bed's nest-like shape and bolster walls help them feel totally secure in a sea of softness so they can always set sail to snooze-filled dreams.",
  },
  {
    id: "fdfdfdfdfseee",
    "product-link":
      "EveryYay  Essentials Snooze Fest Nester Dog Bed(12)$20.00 was $39.99   Special Offer - Price as Marked",
    "product-link-href":
      "https://www.petco.com/shop/en/petcostore/product/everyyay-snooze-fest-nester-dog-bed",
    name: 'EveryYay Essentials Snooze Fest Nester Dog Bed, 32" L X 24" W',
    brand: "EveryYay",
    price: "$20.00",
    "image-src": "images/EveryYay Essentials Snooze Fest Nester Dog Bed.avif",
    description:
      "The EveryYay Essentials Snooze Fest Nester Dog Bed invites them into a cuddly - and sparkly - comfort zone. Designed with a shimmery velvet exterior, this bed is a dream destination for pups who love to curl up thanks to its rounded shape where they can snuggle up and snooze.",
  },
  {
    id: "rererezrzrzrzrz",
    "product-link":
      "EveryYay  Teal Cool Orthopedic Dog Crate Mat(10)$35.99 – $85.99   $25 Off $80 - Mix & Match  Same Day Delivery Eligible",
    "product-link-href":
      "https://www.petco.com/shop/en/petcostore/product/everyyay-teal-cool-orthopedic-dog-crate-mat",
    name: 'EveryYay Teal Cool Orthopedic Dog Crate Mat, 18" L X 11.5" W X 2" H',
    brand: "EveryYay",
    price: "$35.99",
    "image-src": "images/EveryYay Grey Cool Orthopedic Dog Crate Mat.avif",
    description:
      "The Cool Orthopedic Crate Mat from EveryYay keeps your pup cool and cozy whether they are in their crate, kennel, or cuddled up by your feet. The cool-to-touch fabric and orthopedic foam work together to keep your pup comfy and the machine-washable, removable cover allows you to easily clean up after use.",
  },
  {
    id: "sdsdsffffff",
    "product-link":
      "EveryYay  Dining In Stainless Steel Double Diner for Dogs(17)$13.39 – $32.99   $25 Off $80 - Mix & Match  Same Day Delivery Eligible",
    "product-link-href":
      "https://www.petco.com/shop/en/petcostore/product/everyyay-dining-in-stainless-steel-double-diner",
    name: "EveryYay Dining In Stainless Steel Double Diner for Dogs, 1.5 Cups",
    brand: "EveryYay",
    price: "$13.39",
    "image-src":
      "images/EveryYay Dining In Elevated Double Diner for Dogs, 5 Cups.avif",
    description:
      "EveryYay Brushed Stainless Steel features two polished stainless steel dog bowls in a raised platform.",
  },
];

let basket = [];

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
      // let search = basket.find((x) => x.id === id) || [];
      return `
    <div class="item" id=item-id-${id}>
        <img
      width="200"
      src="${imageSrc}"
      alt="${name}"/>
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
          <div id=${id} class="quantity">0
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
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket);
  update(selectedItem.id);
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  // console.log(cartIcon);
  // cartIcon.innerHTML = 100;
  console.log(basket.map((x) => x.item));

  console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0));
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
