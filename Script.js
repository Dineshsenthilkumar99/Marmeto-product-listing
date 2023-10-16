const productContainer = document.getElementsByClassName("container")[0];
const searchInput = document.getElementById("search-input");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

let products = [];

// Function to fetch data from the API
async function fetchProducts() {
    try {
        const response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
        const data = await response.json();
        products = data.data;
        displayProducts(products);
        console.log(products);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display products in grid or list view and search query
function displayProducts(filterProducts, type) {
    productContainer.innerHTML = "";
    console.log(type, filterProducts);
    if (!type) {
        console.log('debug-if');
        filterProducts.forEach(product => {
            let item = `<div class="card">
			<div class="icon">
                <span class='newTag'>New</span>
				<img src="${product.product_image}" alt="img">
			</div>
			<div class="card-body">
				<h2 class="title">${product.product_title}</h2>
				<ul>
                 <li class='varinat'>${product.product_variants[0].v1}</li>
                 <li class='varinat'>${product.product_variants[1].v2}</li>
                 <li class='varinat'>${product.product_variants[2].v3}</li>
                </ul>	
			</div>
		</div>	`
            productContainer.innerHTML += item
        });
    } else {
        console.log('debug-else');
        filterProducts.forEach(product => {
            let item = `<div class="card">
			<div class="icon">
                <span class='newTag'>New</span>
				<img src="${product.product_image}" alt="img">
			</div>
			<div class="card-body">
				<h2 class="title">${product.product_title}</h2>
				<ul>
                 <li class=${product.product_variants[0].v1.toLowerCase().includes(type) ? 'searchVarint varinat' : 'varinat'}>${product.product_variants[0].v1}</li>
                 <li class=${product.product_variants[1].v2.toLowerCase().includes(type) ? 'searchVarint varinat' : 'varinat'}>${product.product_variants[1].v2}</li>
                 <li class=${product.product_variants[2].v3.toLowerCase().includes(type) ? 'searchVarint varinat' : 'varinat'}>${product.product_variants[2].v3}</li>
                </ul>
			</div>
		</div>	`
            productContainer.innerHTML += item
        });
    }
}

searchInput.addEventListener("input", () => {
    const searchKey = searchInput.value.trim().toLowerCase();
    console.log(searchKey);
    displayProducts(products, searchKey)
});

gridViewButton.addEventListener("click", () => {
    productContainer.classList.add('gridView')
    productContainer.classList.remove('listView')
});

listViewButton.addEventListener("click", () => {
    productContainer.classList.remove('gridView')
    productContainer.classList.add('listView')

});

fetchProducts();
