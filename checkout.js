document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = document.querySelector('.submit-btn');
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

  // Display order details
  if (orderDetails.length > 0) {
    displayOrderDetails(orderDetails);
  }

  // Form submission event
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      displayThankYouMessage();
    }
  });

  function validateForm() {
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]');
    let isValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        input.style.border = '1px solid red';
        isValid = false;
      } else {
        input.style.border = '1px solid #ccc';
      }
    });

    return isValid;
  }

  function displayThankYouMessage() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Assuming delivery in 3 days
    const formattedDate = deliveryDate.toDateString();

    const thankYouMessage = `
      <div class="thank-you-message">
        <h2>Thank you for your purchase!</h2>
        <p>Your order will be delivered by ${formattedDate}.</p>
      </div>
    `;

    form.innerHTML = thankYouMessage;
  }

  function displayOrderDetails(orderDetails) {
    const orderTable = document.createElement('table');
    orderTable.innerHTML = `
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${orderDetails.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
          </tr>
        `).join('')}
        <tr>
          <td colspan="2">Total</td>
          <td>${orderDetails.reduce((total, item) => total + item.price, 0)}</td>
        </tr>
      </tbody>
    `;

    form.insertBefore(orderTable, submitBtn);

  }

  //showing the total of the shopping cart inside the output div
  function  showCartTotalInOutput(){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const output = document.getElementById('cart_output');
    output.innerHTML = cart[0];
    let totalAmt = 0;
    cart.forEach(product =>{
      totalAmt += parseInt(product.price) * parseInt(product.quantity);        
    });
    //console.log(totalAmt);
    output.innerHTML = "Your Total Amount : " +  totalAmt;
  }

  showCartTotalInOutput();

});
