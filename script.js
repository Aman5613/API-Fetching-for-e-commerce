
const apiUrl = 'https://fakestoreapi.com/products';
const productsContainer = document.querySelector('.products');
const loadingElement = document.querySelector('.loading');
const errorElement = document.querySelector('.error');
const categoryFilter = document.getElementById('category');

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        displayProducts(products);
        populateCategories(products);
        loadingElement.style.display = 'none';
    } catch (error) {
        console.error('Error fetching products:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
        productsContainer.appendChild(productElement);
    });
}

function populateCategories(products) {
    const categories = new Set(products.map(product => product.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
    });
}

fetchProducts();