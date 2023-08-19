(function () {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  var totalSubtotal = 0;

  // Get the elements
  var tableBody = document.querySelector("tbody");
  var totalSubtotalElement = document.getElementById("total-subtotal");
  // var checkoutButton = document.querySelector(".checkout-btn");
  var errorMessageElement = document.getElementById("error-message");

  // Function to generate table rows
  function generateTableRows() {
    // Clearing  the table body again
    tableBody.innerHTML = "";

    totalSubtotal = 0;

    if (cartItems.length === 0) {
      // Clear the total subtotal
      totalSubtotalElement.textContent = "";
      return;
    }

    cartItems.forEach(function (item, index) {
      // Create a new table row
      var row = document.createElement("tr");

      var imageCell = document.createElement("td");
      var nameCell = document.createElement("td");
      var priceCell = document.createElement("td");
      var quantityCell = document.createElement("td");
      var subtotalCell = document.createElement("td");

      nameCell.className = "item-names";
      priceCell.className = "price-tag";
      quantityCell.className = "quantity-tag";
      subtotalCell.className = "sub-total";


      // Set the content of the table cells
      imageCell.innerHTML = '<img class="checkout-img" src="' + item.image + '" alt="">';
      nameCell.textContent = item.name;
      priceCell.textContent = item.price;
      quantityCell.textContent = item.quantity;

      subtotalCell.textContent = calculateSubtotal(item.price, item.quantity);

      // Append the cells to the table row
      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(subtotalCell);


      tableBody.appendChild(row);

      totalSubtotal += calculateSubtotal(item.price, item.quantity);
    });

    totalSubtotalElement.textContent = totalSubtotal;

  }

  // Generate initial table rows
  generateTableRows();

  // Function to calculate the subtotal
  function calculateSubtotal(price, quantity) {
    return parseFloat(price) * parseInt(quantity);
  }

  // Function to handle the remove button click event.

  function removeCartItem(index) {

    // Remove the item from cartItems array

    cartItems.splice(index, 1);


    // Save the updated cartItems array to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Re-generate the table rows
    generateTableRows();
  }

  // Retrieve the cart items from local storage
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Get the total span element
  var totalSpan = document.querySelector(".total");

  // Set the initial total value
  totalSpan.textContent = cartItems.length;

  // Function to handle adding an item to the cart
  function addItemToCart(item) {
    cartItems.push(item);

    // Save the updated cartItems array to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update the total value
    totalSpan.textContent = cartItems.length;
  }
  
  function clearForm() {
    document.getElementById("checkoutForm").reset();
  }


  function init() {

    document.getElementById("checkoutForm").addEventListener("submit", function (event) {
      window.location.href = "pay.html"

      alert("Your order has been successfully placed!");

    //  Clear the form after successful submission
      clearForm();
      localStorage.removeItem("cartItems");
      window.location.href = "shop.html";

    });

    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    document.getElementById("cartTotal").innerText = cartItems.length;
  }

  init();

})()


