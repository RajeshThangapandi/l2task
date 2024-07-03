

let values={};
fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448")
                .then(response => response.json()) 
                .then(data => {
                   console.log(data.product);
               const title=`<title>${data.product.title}</title>`;
                const companyname=`<h3>${data.product.vendor}</h3>`  
       
                const actualPrice = parseInt(data.product.compare_at_price.replace('$', ''), 10);
                const discountedPrice = parseInt(data.product.price.replace('$', ''), 10);
                let discount = Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
   values.title=data.product.title
           
            document.querySelector('head').insertAdjacentHTML('beforebegin',title)
              document.querySelector('.content').insertAdjacentHTML('afterbegin', `${companyname}`);
              document.querySelector('.bordernew').insertAdjacentHTML('beforebegin', `<h2>${data.product.title}</h2>`);
              document.querySelector('.current-price').insertAdjacentHTML('afterbegin', `${data.product.price}`);
              document.querySelector('.prev-price').insertAdjacentHTML('afterbegin', `${data.product.compare_at_price}`);
              document.querySelector('.dsc').insertAdjacentHTML('afterbegin', `${data.product.description}`);
              document.querySelector('.discount').insertAdjacentHTML('afterbegin', `${discount}`);

    ;


             data.product.options[1].values.forEach(size => {

                const radioContainer = document.querySelector('.size');

                const input = document.createElement('input');
                input.type = 'radio';
                input.id = size;
                input.name = 'fruit';
                input.value = size;

         
                const label = document.createElement('label');
                label.setAttribute('for', size);
                label.textContent = size;


                const br = document.createElement('br');

                
                radioContainer.appendChild(input);
                radioContainer.appendChild(label);
                radioContainer.appendChild(br);
            });

       
        
     const sizeselect = document.querySelectorAll('.size input[type="radio"]');
    
    sizeselect.forEach(function(radio) {
        
        radio.addEventListener('change', function() {
            if (this.checked) {
        
                const labelText = document.querySelector('label[for="' + this.id + '"]').textContent;
                
                
               
                values.size=this.value;
               
            }
        });
    });


    const colorRadios = document.querySelectorAll('.color-group input[type="radio"]');
    
    colorRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Get the text of the selected radio button's label
                const labelText = document.querySelector('label[for="' + this.id + '"]').textContent;
                
                
                // Alternatively, you can get the value attribute of the selected radio button
                values.color=this.value
                
            }
        });
    });


   

            
                })

   
                // -----------SLIDER THUMBNALI----------

                const mainImages = document.querySelectorAll(".default .main-img img");
const thumbnails = document.querySelectorAll(".default .thumb-list div");
const lightboxMainImages = document.querySelectorAll(".lightbox .main-img img");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .thumb-list div"
);
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

let currentImageIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  currentImageIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

iconPrev.addEventListener("click", () => {
  if (currentImageIndex <= 0) {
    changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex - 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconNext.addEventListener("click", () => {
  if (currentImageIndex >= mainImages.length - 1) {
    changeImage(0, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex + 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});


//  --------------- Cart --------------

const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");

let count = 0;
let totalCartQty = 0;


const updateCount = (newCount) => {
  count = newCount;
  countEl.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
 
  updateCount(count + 1);

});


// ---------------- addtocart

document.querySelector('.add-to-cart').addEventListener('click', function() {
 
    if(values.added==true) return;
    values.count=count;
  
    if (count === 0 || values.color==undefined || values.size==undefined) return;
    const newParagraph = document.createElement('p');
    newParagraph.textContent = `${values.title} with Color ${values.color} and ${values.size} added to cart`; 
    newParagraph.className = 'cartmessage';
    document.querySelector('.carts').appendChild(newParagraph);
     values.added=true;
});

// remove item from cart

const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  updateTotalCartQty();

  if (cartItems.children.length === 1) {
    cartItems.classList.add("empty");
    checkout.classList.add("empty");
  }
};





