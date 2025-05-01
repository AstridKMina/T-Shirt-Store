
console.log("script cargado");

const form = document.querySelector(".form");
const product_description = document.getElementById("product-description")
const quantity = document.querySelector(".quantity");
const size = document.querySelector(".size");
const price = document.querySelector(".price");
const modalLink = document.querySelector(".modal-link");


const getProductIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); 
};

console.log("id", getProductIdFromURL())

const loadProductDetails = async () => {
    const id = getProductIdFromURL();
    console.log("id", id)
    const res = await fetch("products.json");
    const products = await res.json();

    const product = products.find(p => p.id === parseInt(id));
    // localStorage.removeItem("items")

    if (product) {
       
        const productDescription = document.querySelector("#product-description");
        if (productDescription) {
            productDescription.innerText = product.name;
        }

        const productImage = document.querySelector(".product__image");
        if (productImage) {
            productImage.src = product.image;
        }

        const productDescriptionText = document.querySelector(".product-description-text");
        if (productDescriptionText) {
            productDescriptionText.innerText = product.description;
        }

        const productPrice = document.querySelector(".price");
        if (productPrice) {
            productPrice.innerText = product.price.replace("$", "");
        }
    }
};


loadProductDetails()


const storedItems = localStorage.getItem("items");
const cartItems = storedItems ? JSON.parse(storedItems) : [];


const handleCart = (event) => {
    event.preventDefault();

    const quantity = Number(document.querySelector(".quantity")?.value);  // Asegúrate de obtener el valor de la cantidad
    const price = Number(document.querySelector(".price")?.innerText); // Asegúrate de obtener el precio correctamente
    

    console.log("quantity", quantity)
    console.log("price", price)

    const cart_object = {
        id: getProductIdFromURL(),
        product_description: document.getElementById("product-description")?.innerText,
        quantity: quantity,  // Usamos la variable `quantity` definida previamente
        size: document.querySelector(".size")?.value,
        price: price * quantity  // Multiplicamos el precio por la cantidad
    };

    console.log("cart object:", cart_object)

    const storedItems = localStorage.getItem("items");
    const cartItems = storedItems ? JSON.parse(storedItems) : [];

    const existingItem = cartItems.find(item => item.id === cart_object.id && item.size === cart_object.size);

    if (existingItem) {
      console.log("existingItem", existingItem)

      existingItem.quantity = Number(existingItem.quantity) + Number(cart_object.quantity);
      console.log("existingItem.quantity", existingItem.quantity)
      existingItem.price = price * existingItem.quantity;
    } else {
      cartItems.push({ ...cart_object });
    }
   
    localStorage.setItem("items", JSON.stringify(cartItems))

    form.reset();

}


if (form) {
    form.addEventListener("submit", handleCart);
} else {
    console.error("Formulario no encontrado.");
}
