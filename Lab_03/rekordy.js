const tableBody = document.querySelector("#products tbody");
const searching = document.getElementById("filter");
const sorting = document.getElementById("sort");

let products = [];
let filtered = [];

async function loadProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = data.products.slice(0,30);
    filtered = [...products];
    renderTable(filtered);
  }
  catch (err) {
    console.error(err);
  }
}

loadProducts();

function renderTable(items) {
  tableBody.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("tr");

    const imgTd = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = item.title;
    imgTd.appendChild(img);

    const titleTd = document.createElement("td");
    titleTd.textContent = item.title;

    const descTd = document.createElement("td");
    descTd.textContent = item.description;

    row.appendChild(imgTd);
    row.appendChild(titleTd);
    row.appendChild(descTd);

    tableBody.appendChild(row);
  });
}

searching.addEventListener("input", () => {
  const search = searching.value.toLowerCase();
  filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  sortAndRender();
});

sorting.addEventListener("change", () => {
  sortAndRender();
});

function sortAndRender() {
  let sorted = [...filtered];

  const sortValue = sorting.value;
  if (sortValue === "asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderTable(sorted);
}
