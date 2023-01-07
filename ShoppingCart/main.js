let carts = document.querySelectorAll('.add-cart');

let product = [
    {
        name: 'AMINO BULID',
        tag: 'AMINOBULID',
        price: 25,
        inCart:0 
    },
    {
        name: 'ANABOLIC HALO',
        tag: 'ANABOLICHALO',
        price: 32,
        inCart:0 
    },
    {
        name: 'ANOTEST',
        tag: 'ANOTEST',
        price: 30,
        inCart:0 
    },
    {
        name: 'CELL TECH',
        tag: 'CELLTECH',
        price: 29,
        inCart:0 
    },
    {
        name: 'CLEAR MUSCLE',
        tag: 'CLEARMUSCLE',
        price: 37,
        inCart:0 
    },
    {
        name: 'CREACORE',
        tag: 'CREACORE',
        price: 40,
        inCart:0 
    },
    {
        name: 'HYDROXYCUT POWDER',
        tag: 'HYDROXYCUTPOWDER',
        price: 29,
        incart:0 
    },
    {
        name: 'ISO ZERO',
        tag: 'ISOZERO',
        price: 24,
        inCart:0 
    },
    {
        name: 'NANO VAPOUR',
        tag: 'NANOVAPOUR',
        price: 19,
        inCart:0 
    },
    {
        name: 'PLATINUM BCAA',
        tag: 'PLATINUMBCAA',
        price: 35,
        inCart:0 
    },
    {
        name: 'PUSH 10',
        tag: 'PUSH10',
        price: 54,
        inCart:0 
    },
    {
        name: 'SHATTER',
        tag: 'SHATTER',
        price: 17,
        inCart:0 
    },
];


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalCost(product[i]);
    })
    
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;

    }
    
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product) {

    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsIncart", JSON.stringify (cartItems));
}

function totalCost(product){
    // console.log("The Product Price Is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My CartCost Is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        
        localStorage.setItem("totalCost", product.price);
    }

    
}


function displayCart(){

    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");

    console.log(cartItems);
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
                <div class="products">
                    <ion-icon name="close-circle"></ion-icon>
                    <img src="./gymimg/${item.tag}.png">
                    <span>${item.name}</span>
                </div>
            `

        });


    }
}




onLoadCartNumbers();
displayCart();
