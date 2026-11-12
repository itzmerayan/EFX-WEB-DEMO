
// PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "RGB Mechanical Keyboard",
        category: "Keyboard",
        price: 3499,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600"
    },
    {
        id: 2,
        name: "Wireless Gaming Mouse",
        category: "Mouse",
        price: 1999,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
    },
    {
        id: 3,
        name: "Gaming Headset Pro",
        category: "Headset",
        price: 2799,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600"
    },
    {
        id: 4,
        name: "UltraWide Gaming Monitor",
        category: "Monitor",
        price: 18999,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"
    },
    {
        id: 5,
        name: "Compact Gaming Keyboard",
        category: "Keyboard",
        price: 2499,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
    },
    {
        id: 6,
        name: "RGB Gaming Mouse",
        category: "Mouse",
        price: 1499,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600"
    },
    {
        id: 7,
        name: "Studio Gaming Headset",
        category: "Headset",
        price: 3999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        id: 8,
        name: "4K Gaming Display",
        category: "Monitor",
        price: 24999,
        image: "https://images.unsplash.com/photo-1527219525722-f9767a7f2884?w=600"
    }
];


// VARIABLES

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const checkoutButton = document.getElementById("checkoutButton");

let cart = [];
let activeCategory = "All";

const formatPrice = price =>
    "₹" + price.toLocaleString("en-IN");


// DISPLAY PRODUCTS

function displayProducts(items) {

    productGrid.innerHTML = "";

    if (items.length === 0) {
        productGrid.innerHTML =
            '<p class="no-products">No products found.</p>';
        return;
    }

    items.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("div");
        image.className = "product-image";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.loading = "lazy";

        image.appendChild(img);

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const button = document.createElement("button");
        button.className = "add-btn";
        button.textContent = "ADD TO CART";
        button.addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(product.id);
});

        info.append(category, name, price, button);
        card.append(image, info);

        card.style.cursor = "pointer";
    
    card.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
});

        productGrid.appendChild(card);
    });
}


// SEARCH AND FILTER

function filterProducts() {

    const searchTerm = searchInput.value.toLowerCase();

    const filtered = products.filter(product => {

        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}


// FILTER BUTTONS

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        activeCategory = button.dataset.filter;

        filterProducts();
    });
});


// CATEGORY CARDS

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;

        document.querySelectorAll(".filter-btn")
            .forEach(btn => {
                btn.classList.toggle(
                    "active",
                    btn.dataset.filter === activeCategory
                );
            });

        filterProducts();

        document.getElementById("products")
            .scrollIntoView({ behavior: "smooth" });
    });
});


// SEARCH

searchInput.addEventListener("input", filterProducts);


// ADD TO CART

function addToCart(productId) {

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    updateCart();
}


// REMOVE FROM CART

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();
}


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        total += product.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent =
            `${formatPrice(product.price)} × ${item.quantity}`;

        details.append(name, price);

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "REMOVE";

        remove.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        div.append(details, remove);

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
}


// OPEN CART

function openCart() {
    cartPanel.classList.add("show");
    overlay.classList.add("show");
}


// CLOSE CART

function hideCart() {
    cartPanel.classList.remove("show");
    overlay.classList.remove("show");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
overlay.addEventListener("click", hideCart);


// MOBILE NAVBAR

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


// DEMO CHECKOUT

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Demo checkout! No real payment has been made.");

});


// INITIAL LOAD

displayProducts(products);
updateCart();
