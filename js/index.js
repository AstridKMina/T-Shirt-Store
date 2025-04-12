
console.log("hola")
const navigationRes = document.querySelector(".navigation--list");
const burguer_navigation = document.querySelector(".navigation--button");
const container = document.querySelector(".grid");



const insertProducts = async () => {
    try {
        const res = await fetch("./products.json")
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data
        console.log("JSON data:", data);
    } catch (error) {
        console.error("Error fetching JSON data")
    }
}

const loadProducts = async () => {
    const products = await insertProducts();  // Esperamos a que los productos se obtengan
    console.log("products", products);  // Ahora podemos usar los datos aquí
    // localStorage.removeItem("items");

    // Ahora podemos hacer el map
    if (products) {
       products.forEach((product) => {
            // Aquí puedes manipular los productos

            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.id = `${product.id}`;

            // Crear el contenido HTML dentro del contenedor
            productElement.innerHTML = `
               <a href=${product.link}?id=${product.id}>
                    <img class="product__imagen" src=${product.image} alt="image tshirt">
                    <div class="product__information">
                        <p class="product__name">${product.name}</p>
                        <p class="product__price">${product.price}</p>
                    </div>
               </a>
            `
            container.appendChild(productElement);

            console.log(productElement);

            // product = document.querySelector(".product");
            console.log("query selector:", product)

        });
    }

}

loadProducts();

let isOpen = false;

burguer_navigation.addEventListener("click", () => {
    isOpen = !isOpen

    if (isOpen) {
        navigationRes.innerHTML = `
<ul>
  <li><a class="navigation--link navigation--link--active" href="index.html">Store</a></li>
  <li><a class="navigation--link navigation--link--active" href="us.html">About us</a></li>
  <li><a class="navigation--link modal-link navigation--link--active" href="#">Shopping cart</a></li>
</ul>`

        navigationRes.style.display = "block"
    } else {
        navigationRes.style.display = "none";
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            navigationRes.style.display = "none";
        }

    });

})







