const shopping_items = localStorage.getItem("items")

console.log("a ver que me da el local:", JSON.parse(shopping_items))
const cart_items = JSON.parse(shopping_items)

const tBody = document.querySelector("#cart-table tbody");



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
        <button class="delete-div"><i class="fa-solid fa-trash"></i></button>
    </td>
`;


        console.log("este es row dentro del forEach:", row)

        tBody.appendChild(row);

        console.log("tbody:", tBody)
        console.log("modal--product--list:")

    })}


     // Shopping cart total

     const total = cart_items.reduce((accumulador, item) => accumulador + Number(item.price), 0)

     const cart__total = document.querySelector(".cart__total").innerText = total;

     console.log("total", total)

     // Delete a shopping cart item

     const deleteButtons = document.querySelectorAll(".delete-div");

     deleteButtons.forEach(button => {
         button.addEventListener("click", (e) => {
             e.preventDefault();

             const product_id = e.target.closest('tr').querySelector(".product_id").innerText; // Obtener la descripción del producto desde la fila

             console.log("product:", product_description);
             // Obtener los items del localStorage
             const storedItems = localStorage.getItem("items");
             const cart_items = storedItems ? JSON.parse(storedItems) : [];

             // Filtrar el item a eliminar
             const updatedItems = cart_items.filter(
                 (item) => item.id !== product_id
             );

             console.log("para eliminar:", updatedItems);

             // Guardar los nuevos items
             localStorage.setItem("items", JSON.stringify(updatedItems));

             // Opcional: recargar o actualizar la UI
             location.reload(); // Para actualizar la vista si es necesario
         });
     });

     // Modified product quantity in the shopping cart

     const addQuantityButtons = document.querySelectorAll(".add-button");

     addQuantityButtons.forEach(button => {
         button.addEventListener("click", (e) => {
             e.preventDefault();

             const product_id = e.target.closest('tr').querySelector(".product_id").innerText; // Obtener la descripción del producto desde la fila

            //  console.log("quantity:", quantity);

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

            //  console.log("quantity:", quantity);

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
 


