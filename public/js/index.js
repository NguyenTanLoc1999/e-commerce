/*
Navigation
*/

//

const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  const navLeft = menu.getBoundingClientRect().left;
  if (navLeft < 0) {
    menu.style.left = "0";
    document.body.classList.add("active");
  } else {
    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  }
});

navClose.addEventListener("click", () => {
  const navLeft = menu.getBoundingClientRect().left;
  if (navLeft > 0) {
    menu.style.left = "0";
  } else {
    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  }
});

// Smooth Scroll

const navBar = document.querySelector(".navigation");
const scrollLinks = document.querySelectorAll(".scroll-link");

Array.from(scrollLinks).forEach(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: "0",
      top: position,
    });

    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  });
});

// FixNav

window.addEventListener("scroll", () => {
  const navHeight = navBar.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }
});

// Cart js
let carts= document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'T Shirt 1',
        tag: 'pic1',
        price:15,
        inCart:0
    },
    {
        name: 'T Shirt 2',
        tag: 'pic1',
        price:20,
        inCart:0
    },
    {
        name: 'T Shirt 3',
        tag: 'pic3',
        price:15,
        inCart:0
    },
    {
        name: 'T Shirt 4',
        tag: 'pic7',
        price:20,
        inCart:0
    }
]

for(let i =0; i<carts.length;i++)
{
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers =localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.nav__item span').textContent =productNumbers;
    }
}


function cartNumbers(product){
    let productsNumbers =localStorage.getItem('cartNumbers');
    productsNumbers = parseInt(productsNumbers);
    if(productsNumbers){
        localStorage.setItem('cartNumbers',productsNumbers + 1);
        document.querySelector('.nav__item span').textContent =productsNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1 );
        document.querySelector('.nav__item span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems ={
            ...cartItems,
            [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else{
        product.inCart=1;
        cartItems ={
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost);
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);

    }else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">      
                <img src="./images/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>            
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div> 
            <div class="total">
                $${item.inCart * item.price}
            </div>
            `;
        });
        productContainer.innerHTML += `
          <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
              Basket Total
              </h4>
              <h4 class="basketTotal">
                $${cartCost}
        `;
    }
}


//Form login
function checkForm(){
  if(document.formLogin.username.value == "")
  {
      alert("Please input username !")
      document.formLogin.username.focus();
      return false;
  }
  if(document.formLogin.password.value == "")
  {
      alert("Please input password !")
      document.formLogin.password.focus();
      return false;
  }
}

onLoadCartNumbers();
displayCart();

