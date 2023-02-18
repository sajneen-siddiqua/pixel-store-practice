// how to fetch data with async await
// const phoneDatas = async () =>{
//   const res = await fetch ('file.json');
//   const data = await res.json();
// displayData(data);
// }
// phoneDatas();

// fetch data
let dataset;
fetch("file.json")
  .then((response) => response.json())
  .then((data) => {
    dataset = data;
    displayData(data);
  });

function displayData(data) {
  //  console.log(data)
  const cardContainer = document.getElementById("homepage-content");
  data.forEach((element) => {
    // console.log(element);
    const { id, img, name, price } = element;
    const divContainer = document.createElement("div");
    divContainer.classList.add("card", "bg-base-100", "shadow-2xl");
    divContainer.innerHTML = `
      
      <figure><img class="w-full rounded-lg" src="${img}"/></figure>
      
        <div class="card-body">
          <div id="parent-name-icon-container" class="flex justify-between">
            <h2 class="card-title">"${name}"</h2>
          <div>
            <span><i class="fa-solid fa-heart text-slate-500 mr-4"></i></span>
            <span><i class="fa-regular fa-square-minus text-red-600"></i></span>
          </div>
          </div>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p class="text-2xl text-red-500"><strong>Price:</strong>"${price}"</p> 
          <div class="flex justify-between">
            <label onclick="handleModal('${id}')" for="my-modal-3" class="btn btn-outline btn-primary">See Details</label> 
            <button onclick="handleBuyNow('${id}')" class="btn btn-outline btn-secondary"><i class="fa-solid fa-bag-shopping mr-4"></i>Buy Now</button>
            
          </div>
        </div>
        
       `;
    cardContainer.appendChild(divContainer);
  });
}

function handleModal(id) {
  const product = dataset.find((item) => item.id === id);
  console.log(product);
  const { img, name, price } = product;
  const modalContainer = document.getElementById("modal-info");
  modalContainer.innerHTML = `
             <div>
                <img class="w-full h-80" src="${img}" alt="" />
                <h1 class="text-2xl">
                  <strong class="text-slate-600">Product: </strong>"${name}"
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo voluptas placeat expedita atque! Officiis laborum
                  atque facere sunt magni repellat nemo hic delectus cumque
                  tempora? Natus deleniti ea quod labore?
                </p>
                <br />
                <h2 class="text-2xl">
                  <strong class="text-slate-600">Features: </strong
                  >Features1,Features2,Features3
                </h2>
                <br />
                <h1 class="text-2xl font-bold text-red-700">
                  <strong class="text-slate-600">Price: </strong>"${price}"
                </h1>
              </div>
  `;
}
let count = 0;
let newPrice = 0;
let tax = 0;
let totalAmount = 0;
function handleBuyNow(id) {
  count++;

  const product = dataset.find((item) => item.id === id);
  const { img, name, price } = product;

  newPrice = newPrice + product.price;
  tax = newPrice * 0.1;
  totalAmount = newPrice + tax;
  const cartContainer = document.getElementById("cart-items-container");

  const div = document.createElement("div");
  div.classList.add(
    "border-[2px]",
    "flex",
    "justify-between",
    "items-center",
    "bg-slate-100"
  );
  div.innerHTML = `
                <img class="w-[20%]" src="${img}" alt="" />
                <p class="font-semibold">"${name}"</p>
                <p class="border-[4px] px-[10px] py-[2px] rounded-md">1</p>
                <i class="fa-sharp fa-solid fa-trash text-xl text-red-600"></i>
              `;
  cartContainer.appendChild(div);
  document.getElementById("product-count").innerText = count;
  document.getElementById("Price").innerText = newPrice.toFixed(2);
  document.getElementById("tax-count").innerText = tax;
  document.getElementById("total-count").innerText = totalAmount.toFixed(2);
}

function handleClear() {
  document.getElementById("cart-items-container").innerHTML = " ";
  document.getElementById("calculation").innerHTML = " ";
}
