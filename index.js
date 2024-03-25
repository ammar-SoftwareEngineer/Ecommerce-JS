let productsContainer = document.querySelector("#products");
let checkBox = document.querySelectorAll(".check");
let search = document.querySelector("#search");
let countCart = document.querySelector("#countCart");
let filter = document.querySelector("#filter-container");
let productElement = [];
let filteredProducts = [];

async function getData() {
  let getDataPro = await fetch("./data.json");
  let response = await getDataPro.json();
  createProduct(response);
  filterProducts();
}
getData();

let cartItemCount = 0;

function createProduct(product) {
  let productData = ``;
  for (let i = 0; i < product.length; i++) {
    productData += `
      <div class="item"
      data-category="${product[i].category}"
      data-name="${product[i].name}" >
     <div class="bg-gray-100 flex justify-center relative rounded-xl border-2 overflow-hidden cursor-pointer group " >
      <img class=" w-full h-full object-cover rounded-xl" src="${product[i].url}" alt="">
      <button class="status added bg-green-700 absolute bottom-0 left-0 py-2 w-full translate-y-full group-hover:translate-y-0 transition">إضافة الي السلة</button>
    </div>
    <div class="content-product flex items-center justify-between ">
    <p class="text-xl mt-2">${product[i].name}</p>
    <strong class="mt-3">${product[i].price}$</strong>
    </div>
    </div>`;
  }

  productsContainer.innerHTML = productData;
  productsContainer.querySelectorAll(".status").forEach((element) => {
    element.addEventListener("click", updateCart);
  });
  productElement = Array.from(productsContainer.querySelectorAll(".item"));
}

function updateCart(e) {
  let statusElement = e.target;
  console.log(statusElement);
  if (statusElement.classList.contains("added")) {
    statusElement.classList.remove("added");
    statusElement.classList.add("bg-red-600");
    statusElement.classList.remove("bg-green-700");
    statusElement.innerText = "حذف من السلة";
    cartItemCount++;
  } else {
    statusElement.classList.add("added");
    statusElement.classList.remove("bg-red-600");
    statusElement.classList.add("bg-green-700");
    statusElement.innerText = "إضافة الى السلة";
    cartItemCount--;
  }
  countCart.innerText = cartItemCount;
}

filter.addEventListener("change", filterProducts);

search.addEventListener("keyup", (e) => {
  let searchTerm = e.target.value.toLowerCase();
  let filteredProducts = productElement.filter((element) =>
    element.dataset.name.toLowerCase().includes(searchTerm)
  );
  updateProductDisplay(filteredProducts);
});

function filterProducts() {
  let selectCategories = Array.from(checkBox)
    .filter((check) => check.checked)
    .map((check) => check.id);
  if (selectCategories.length === 0) {
    filteredProducts = productElement;
  } else {
    filteredProducts = productElement.filter((element) =>
      selectCategories.includes(element.dataset.category)
    );
  }

  updateProductDisplay(filteredProducts);
}
function updateProductDisplay(products) {
  let productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    productsContainer.appendChild(product);
  });
}
