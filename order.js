let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartTable();
});

function addItem(name, price, qtyId) {
    const quantity = parseFloat(document.getElementById(qtyId).value);
    if (!isNaN(quantity) && quantity > 0) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        saveCartToLocalStorage();
        updateCartTable();
    }
}

function updateCartTable() {
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const row = cartTable.insertRow();
        const nameCell = row.insertCell(0);
        const qtyCell = row.insertCell(1);
        const priceCell = row.insertCell(2);
        const actionCell = row.insertCell(3); // action cell for remove button

        nameCell.textContent = item.name;
        qtyCell.textContent = item.quantity;
        priceCell.textContent = `Rs.${item.price * item.quantity}/=`;
        actionCell.innerHTML = `<button onclick='removeItemFromCart("${item.name}")'>Remove</button>`;

        total += item.price * item.quantity;
    });

    const totRow = cartTable.insertRow();
    totRow.insertCell(0);
    totRow.insertCell(1);
    totRow.insertCell(2);
    const totalAmountCell = totRow.insertCell(3);
    totalAmountCell.innerHTML = "<td colspan='4'>Total Amount: Rs." + total + "/=<td>";
    totalAmountCell.style.fontWeight = "bold";
    totalAmountCell.style.fontSize = "120%";
    totalAmountCell.style.color = "green";
}

function removeItemFromCart(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        const confirmRemove = confirm('Remove the item from the cart?');
        if (confirmRemove) {
            cart.splice(itemIndex, 1);
            saveCartToLocalStorage();
            updateCartTable();
        }
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveFavorite() {
    if (cart.length === 0) {
        alert('No items in the cart to save as favourite!');
    } else {
        localStorage.setItem('favoriteCart', JSON.stringify(cart));
        alert('Favourite saved!');
    }
}

function applyFavorite() {
    const favoriteCart = localStorage.getItem('favoriteCart');
    if (favoriteCart) {
        cart = JSON.parse(favoriteCart);
        saveCartToLocalStorage();
        updateCartTable();
        alert('Favourite applied!');
    } else {
        alert('No favourites found!');
    }
}

document.getElementById('buy-now').addEventListener('click', () => {
    saveCartToLocalStorage();
    window.location.href = 'checkout.html';  // Change this to your actual checkout page
});
