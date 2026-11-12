
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);

const detail = document.getElementById("productDetail");

if (!product) {

    detail.textContent = "Product not found.";

} else {

    let quantity = 1;

    const layout = document.createElement("div");
    layout.className = "detail-layout";

    const imageBox = document.createElement("div");
    imageBox.className = "detail-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    imageBox.appendChild(img);

    const info = document.createElement("div");
    info.className = "detail-info";

    const category = document.createElement("p");
    category.textContent = product.category;

    const title = document.createElement("h1");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = "₹" + product.price.toLocaleString("en-IN");

    const description = document.createElement("p");
    description.textContent =
        "Upgrade your gaming setup with this premium gaming accessory from NEXORA.";

    const quantityBox = document.createElement("div");
    quantityBox.className = "quantity";

    const minus = document.createElement("button");
    minus.textContent = "-";

    const number = document.createElement("span");
    number.textContent = quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";

    minus.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            number.textContent = quantity;
        }
    });

    plus.addEventListener("click", () => {
        quantity++;
        number.textContent = quantity;
    });

    quantityBox.append(minus, number, plus);

    const addButton = document.createElement("button");
    addButton.className = "detail-add";
    addButton.textContent = "ADD TO CART";

    addButton.addEventListener("click", () => {

        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }

        alert("Added to cart!");
    });

    info.append(
        category,
        title,
        price,
        description,
        quantityBox,
        addButton
    );

    layout.append(imageBox, info);

    detail.replaceChildren(layout);
}
