let category_nav_list = document.querySelector('.category-nav-list');
function OpenCateList(){
    category_nav_list.classList.toggle('active');
}
    


var cart = document.querySelector('.cart');
function  OpenCloseCart(){
    cart.classList.toggle('active');
}

  
fetch('product.json')
.then(Response => Response.json())
.then(data => {

    const addTocartButtons =document.querySelectorAll('.btn-add-cart');
    addTocartButtons.forEach(button =>{

        button.addEventListener("click",(event)=>{
            const productİd = event.target.getAttribute('data-id');
            const selectedproduct = data.find(product => product.id == productİd);
            addToCart(selectedproduct);




            const allMatchingbuttons = document.querySelectorAll
            (`.btn-add-cart[data-id="${productİd}" ]`)
            
            allMatchingbuttons.forEach(btn=>{
                btn.classList.add("active");
                btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>
                 item in cart  `

            })




        })
    })

})


function addToCart(product){
    let cart = JSON.parse(localStorage.getItem('cart'))  || []
    cart.push({...product, quantity:1})
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}



function increaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart [index].quantity +=1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    
     // احذف العنصر إذا وصل 0

   if(cart [index].quantity >1){
    
       cart [index].quantity -=1;

   }


    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}


function updateCart(){


    const cartItemsContainer = document.getElementById('cart-items');

    var total_price =0;
    var total_count=0;

    let cart = JSON.parse(localStorage.getItem('cart'))  || []

    cartItemsContainer.innerHTML = " ";


    cart.forEach((item, index) => {

        let total_price_item = item.price* item.quantity;
        total_price += total_price_item;
        total_count += item.quantity;
             

        cartItemsContainer.innerHTML  += `

    <div class="item-cart">
         <img src="${item.img}" alt="">
        <div class="content">
              <h4> ${item.name} </h4>
              <p class="price-cart"> $${total_price_item }</p>
              <div class="quantity-control">
                  <button class="decrease-quantity"   data-index="${index}">-</button>
                 <span class="quantity"> ${item.quantity} </span>
                  <button class="increase-quantity"  data-index="${index}">+</button>

                </div>
         </div>
       <button class="delete-item" data-index='${index}' >
       <i class="fa-solid fa-trash-can"></i></button>

    </div> `

    })

    const price_cart_total = document.querySelectorAll('.price-cart-total');
    const count_item_cart = document.querySelectorAll('.count-items-cart');
    const  count_item_header= document.querySelectorAll('.count-item-header');
    
   // تحديث السعر وعدد العناصر في جميع الأماكن
document.querySelectorAll('.price-cart-total').forEach(el => {
    el.innerHTML = `$${total_price}`;
});

document.querySelectorAll('.count-items-cart').forEach(el => {
    el.innerHTML = total_count;
});

document.querySelectorAll('.count-item-header').forEach(el => {
    el.innerHTML = total_count;
});


    // ✅ أزرار الزيادة والنقصان

    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    
    increaseButtons.forEach(button=>{
        button.addEventListener('click', (event)=>{
            const itemİndex = event.target.getAttribute("data-index");
            increaseQuantity(itemİndex);
        })
    })
    decreaseButtons.forEach(button=>{
        button.addEventListener('click', (event)=>{
            const itemİndex = event.target.getAttribute("data-index");
            decreaseQuantity(itemİndex);
        })
    })




    // ✅ زر الحذف

    const deletebuttons = document.querySelectorAll('.delete-item');
    deletebuttons.forEach(button=>{
        button.addEventListener('click', (event)=>{
            const item_index = event.target.closest('button').getAttribute( 'data-index' );
            removeFromCart(item_index);
        })
    })

}

updateCart();

function removeFromCart(index){
    let cart = JSON.parse(localStorage.getItem('cart'))  || []

    //احذف واحد ورجع الباقي  الاول والوحيد
    const removeproduct = cart.splice(index,1)[0]
    localStorage.setItem('cart' ,JSON.stringify(cart));

    updateCart();

    updateButtonsState(removeproduct.id)

}
function updateButtonsState(productId){
    const allMatchingbuttons = document.querySelectorAll(`.btn-add-cart[data-id="${productId}" ]`);
    allMatchingbuttons.forEach(button =>{
        button.classList.remove("active");
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>
                 add To cart  `
    })

}

  