document.addEventListener("DOMContentLoaded", () => {
    const modalLink = document.querySelector(".modal-link");
    const modalContainer = document.querySelector("#modal-container");

    modalLink.addEventListener("click", async (e) => {
        e.preventDefault();


        const shopping_items = localStorage.getItem("items")

        console.log("a ver que me da el local:", JSON.parse(shopping_items))
        const cart_items = JSON.parse(shopping_items)

        const response = await fetch("modal.html");
        const modalHTML = await response.text();
        modalContainer.innerHTML = modalHTML;

        const modal = document.querySelector(".modal--product--list");
        const closeButton = document.querySelector(".close-button");
        const tBody = document.querySelector("#cart-table tbody");


        if (!tBody) {
            console.error("No se encontró el tbody en el modal");
            return;
        }

        console.log("cart items:", cart_items)

        if (cart_items) {
            cart_items.forEach((cart_item) => {
                // Seleccionamos la fila de la tabla donde queremos agregar los datos
                const row = document.createElement("tr");

                row.innerHTML = `
        <td class="product_id" style="display: none;">${cart_item.id}</td>
        <td class="product_description">${cart_item.product_description}</td>
        <td class="quantity">${cart_item.quantity}</td>
        <td class="size">${cart_item.size}</td>
        <td class="price">${cart_item.price}</td>
                   <td class="edit-div">
                <button class="add-button">+</button>
                <button class="edit-button" disabled><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="reduce-button">-</button>
                <button class="delete-item"><i class="fa-solid fa-trash"></i></button>
            </td>
      `;


                console.log("este es row dentro del forEach:", row)

                tBody.appendChild(row);

                console.log("tbody:", tBody)
                console.log("modal--product--list:", modal)

            })

            // Shopping cart total

            const total = cart_items.reduce((accumulador, item) => accumulador + Number(item.price), 0)

            const cart__total = document.querySelector(".cart__total").innerText = total;

            console.log("total", total)

            // Delete a shopping cart item

            const deleteButtons = document.querySelectorAll(".delete-item");

            deleteButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();

                    const row = e.target.closest('tr');
                    const productId = row.querySelector(".product_id")?.innerText.trim();
                    const size = row.querySelector(".size")?.innerText.trim();
                    console.log("product:", product_description);
                    // Obtener los items del localStorage

                    let cart_items = [];
                    try {
                        const storedItems = localStorage.getItem("items");
                        cart_items = storedItems ? JSON.parse(storedItems) : [];
                    } catch (error) {
                        console.error("Error al parsear items de localStorage:", error);
                        return;
                    }

                    // Filtrar el item a eliminar
                    const updatedItems = cart_items.filter(
                        (item) => !(item.id === productId && item.size === size)
                    );

                    console.log("para eliminar:", updatedItems);

                    // Guardar los nuevos items
                    localStorage.setItem("items", JSON.stringify(updatedItems));

                    // Opcional: recargar o actualizar la UI
                    row.remove();
                });
            });

            // Modified product quantity in the shopping cart

            const addQuantityButtons = document.querySelectorAll(".add-button");

            addQuantityButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();

                    const product_id = e.target.closest('tr').querySelector(".product_id").innerText; // Obtener la descripción del producto desde la fila

                    console.log("quantity:", quantity);

                    // Obtener los items del localStorage
                    const storedItems = localStorage.getItem("items");
                    const cart_items = storedItems ? JSON.parse(storedItems) : [];

                    // Filtrar el item a eliminar
                    const updatedItems = cart_items.map(item => {
                        if (item.id === product_id) {
                            const newPrice = Number(item.price / item.quantity)
                            const newQuantity = Number(item.quantity) + 1;

                            return {
                                ...item,
                                quantity: newQuantity,
                                price: Number(newPrice) * newQuantity // Ojo, necesitas guardar `unitPrice` por separado

                            };
                        }
                        return item;
                    });

                    console.log("para eliminar:", updatedItems);

                    // Guardar los nuevos items
                    localStorage.setItem("items", JSON.stringify(updatedItems));

                    // Opcional: recargar o actualizar la UI
                    location.reload(); // Para actualizar la vista si es necesario
                });
            });

            // Reduce quantity in shopping car

            const restQuantityButtons = document.querySelectorAll(".reduce-button");

            restQuantityButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();

                    const product_id = e.target.closest('tr').querySelector(".product_id").innerText; // Obtener la descripción del producto desde la fila

                    console.log("quantity:", quantity);

                    // Obtener los items del localStorage
                    const storedItems = localStorage.getItem("items");
                    const cart_items = storedItems ? JSON.parse(storedItems) : [];

                    // Filtrar el item a eliminar
                    let updatedItems = cart_items.map(item => {
                        if (item.id === product_id) {
                            const newPrice = Number(item.price / item.quantity)
                            const newQuantity = Number(item.quantity) - 1;

                            return {
                                ...item,
                                quantity: newQuantity,
                                price: Number(newPrice) * newQuantity

                            };
                        }
                        return item;
                    });

                    // Eliminar los que llegaron a 0
                    updatedItems = updatedItems.filter(item => item.quantity > 0);

                    console.log("para eliminar:", updatedItems);

                    // Guardar los nuevos items
                    localStorage.setItem("items", JSON.stringify(updatedItems));

                    // Opcional: recargar o actualizar la UI
                    location.reload(); // Para actualizar la vista si es necesario
                });
            })
        }


        console.log("tbody:", tBody)
        console.log("modal--product--list:", modal)


        modal.style.display = "block";

        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }

        });
    });


});
