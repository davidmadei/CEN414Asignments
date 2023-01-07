// OPEN & CLOSE CART

// calling the ids
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

// calling the cart icons
    // onclick event to open cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});
    // onclick event to close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Start when the document is ready

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);

}else{
    start();
}

//START

function start(){
    addEvent();

}

// UPDATE & REMINDER

function update() {
    addEvent();
    updateTotal();


}

// .......................ADD EVENTS.......................

    // the event function

function addEvent() {
    // Remove items from cart

    let cartRemove_btns = document.querySelectorAll('.cart-remove');
        console.log(cartRemove_btns);
        cartRemove_btns.forEach(btn => {
        btn.addEventListener("click",handle_removeCartItem);
    });

    // CHANGE ITEM QUANTITY

    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
        cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // ADD ITEMS TO CART

    let addCart_btns = document.querySelectorAll('.add-cart');
        addCart_btns.forEach((btn) =>{
        btn.addEventListener("click", handle_addCartItem);

    });

    // ORDER 
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

//........................ HANDLE EVENTS FUNCTIONS......................

let itemsAdded =[]

function handle_addCartItem(){      // HANDLE_ADDCARTITEM FUNCTION
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,

    };

    // HANDLE ITEM ALREADY EXIST

    if(itemsAdded.find(el => el.title == newToAdd.title)){          //EL
        alert("This Item Is Already Exist in cart! ");
        return;

    }else{
        itemsAdded.push(newToAdd);
    }

    // Add Product to cart

    let cartBoxElement = cartBoxComponent(title, price, imgSrc);   
    let newMode = document.createElement("div");    //APPENDING THE HTML DIV 
    newMode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newMode);

    update();

}


function handle_removeCartItem(){       // HANDLE_REMOVECARTITEM FUNCTION
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) => el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML
    );

    update();
}

function handle_changeItemQuantity() {      // HANDLE_CHANGECARTQUALITYFUNCTION
    if(isNaN(this.value)|| this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integar

    update();

    
}

function handle_buyOrder() {        //HANDLE PROMPT-UP ALERT
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order first.");
        return;
    }

    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is Successfully :)");

    itemsAdded = [];

    update();

}

function addTocart(){
    if (add-cart === onclick){
        alert("Your Item has been successfully added to cart!");
        return;
    }
}

// ............................UPDATE & REMINDER FUCTIONS..........................

function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quatity = cartBox.querySelector('.cart-quantity').value;
        total += price * quatity;
    });

    // keep 2 digit after the decimal point

    total = total.toFixed(2);
    // or we can use 
    // total = math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;
}

// ................HTML COMPONENTS...............

// add to cart
function cartBoxComponent(title, price, imgSrc) {  //HTML DIV
    return ` 
        <div class="cart-box">
            <img src=${imgSrc} class="cart-img" alt="">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!---REMOVE CART--->
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`;
}

                                