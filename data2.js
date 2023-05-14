function countObjects(products) {
  return products.length;
}
console.log(countObjects(products));

// function openLinks(products) {
//   const delays = [3000, 4000, 6000, 8000];
//   let index = 0;
//   for (const product of products) {
//     const delay = delays[index % delays.length];
//     setTimeout(() => {
//       window.open(product["product-link-href"]);
//     }, delay);
//     index++;
//   }
// }
// openLinks(products);

const rationalPaths = [
  "images/EveryYay Blue Nautical Striped Nester Dog Bed.avif",
  "images/EveryYay Dining In Elevated Double Diner for Dogs, 5 Cups.avif",
  "images/EveryYay Dining In Stainless Steel Double Diner for Dogs, 1.5 Cups.avif",
  "images/EveryYay Embrace the Pace Teal Reflective Dog Harness, X-Small.avif",
  "images/EveryYay Essentials Snooze Fest Nester Dog Bed.avif",
  "images/EveryYay Grey Cool Orthopedic Dog Crate Mat.avif",
  "images/EveryYay Happy Place Plush Dog Mat, XX-Small.avif",
  "images/EveryYay Lavender Quilted Dog Throw.avif",
  "images/EveryYay Melange Orthopedic Dog Nester.avif",
  "images/EveryYay Serve & Preserve Food Storage, 15 lbs.avif",
  "images/EveryYay Slant Open Storage Container for Dogs, 20 lbs.avif",
  "images/Good Lovin' No Rawhide Pumpkin Flavored Puppy Teething Rings, 4.9 oz., Count of 4.avif",
  "images/Pet Honesty Bladder Health Cranberry Soft Chews for Dogs, Count of 90.avif",
  "images/Reddy Weighted Pet Blanket.avif",
];

// products.forEach((product) => {
//   for (let path of rationalPaths) {
//     const productWords = product.name.split(" ");
//     const pathWords = path.split(" ");
//     let matchCount = 0;

//     for (let i = 0; i < productWords.length; i++) {
//       if (pathWords.includes(productWords[i])) {
//         matchCount++;
//       }
//     }

//     if (matchCount >= 4) {
//       product["image-src"] = path;
//       break;
//     }
//   }
// });

// console.log(products);

// function openProductLinks(products) {
//   products.forEach((product) => {
//     if (product["image-src"] === "") {
//       window.open(product["product-link-href"], "_blank");
//     }
//   });
// }

// // Usage:
// openProductLinks(products);

function generateRandomId(arr) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const length = 12;

  for (let i = 0; i < arr.length; i++) {
    let newId = "";
    for (let j = 0; j < length; j++) {
      newId += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    arr[i].order = newId;
  }

  return arr;
}

const updatedShopItemsData = generateRandomId(shopItemsData);
console.log(updatedShopItemsData);

function countObjects(shopItemsData) {
  return shopItemsData.length;
}
console.log(countObjects(shopItemsData));
