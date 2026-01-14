let cart = [];

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("shopPage").style.display = "block";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid Login";
    }
}


function logout() {
    cart = [];
    updateCart();
    document.getElementById("shopPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

/* ADD TO CART */
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCart();
}


function updateCart() {
    let list = document.getElementById("cartItems");
    let total = 0;
    list.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        list.innerHTML += `
            <li>
                ${item.name} - ₹${item.price} × ${item.qty}
                <button onclick="changeQty(${index},1)">+</button>
                <button onclick="changeQty(${index},-1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </li>`;
    });

    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}

/* CHANGE QUANTITY */
function changeQty(index, value) {
    cart[index].qty += value;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function buyNow() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    alert("Order placed successfully ✅");
    cart = [];
    updateCart();
}
