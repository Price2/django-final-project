
var sub_total = 0;
var total = 0;
var shipping = 10;
$(document).ready(function () {
    $('#placeOrder').click(function (e) {
       /* This code block is responsible for handling the click event on the "placeOrder" button. When
       the button is clicked, it prevents the default form submission behavior, retrieves data from
       the localStorage, defines the data to send in the POST request, and sends the POST request to
       the server. */
        // e.preventDefault(); // Prevent the default form submission behavior

        // Retrieve data from localStorage
        var cartData = JSON.parse(localStorage.getItem('cart_prod'));


        // Define the data to send in the POST request
        var postData = {
          cartData: cartData,
          total_price: total
      };
        console.log("total???? ", total)
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        console.log("post data: ", postData)
        console.log("cart data: ", cartData)
        const request = new Request(
            '/products/order/success',
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json',
                },
                mode: 'same-origin', // Do not send CSRF token to another domain.
                body: JSON.stringify(postData)
            }
        );
      fetch(request).then(function (response) {
          console.log("success? ", response)
          window.location.href = response.url;
        });
       
    });
});


$(document).ready(function () {

    /* This code block is responsible for retrieving data from the local storage and displaying it on
    the webpage. */
    if (localStorage.getItem('cart_prod')) {
        // Retrieve the data as a string from local storage
        const dataString = localStorage.getItem('cart_prod');
      
        try {
          // Parse the data string into an array of objects
          const dataArray = JSON.parse(dataString);
          // update_cart(dataArray)

          // Get a reference to the HTML element where you want to display the products
            const productListContainer = $('.checkout-review-products')
      
          // Loop through the array of objects and create HTML elements for each product
          dataArray.forEach(product => {
              productListContainer.append(`
              <tr class="prod-review">
                      <th scope="row" class="border-0">
                        <div class="p-2">
                          <img src="${product.img_url}" alt="" width="70" class="img-fluid rounded shadow-sm prod-review-img">
                          <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle prod-review-name">${product.name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                          </div>
                        </div>
                      </th>
                      <td class="border-0 align-middle"><strong class="prod-review-price">$${product.price}</strong></td>
                      <td class="border-0 align-middle"><strong class="prod-review-quant">${product.quantity}</strong></td>
                      <td class="border-0 align-middle" onClick="removeFromReviewCart(this)"><i class="fa fa-trash" style="cursor:pointer;"></i></td>
                    </tr>
            `)
          });
        } catch (error) {
          console.error('Error parsing data from local storage:', error);
        }
      } else {
        console.log('Data not found in local storage');
    }

    if (window.location.pathname === '/products/thanks') {
      localStorage.removeItem('cart_prod');
  }
    calc_sub_and_total()

});

/**
 * The function calculates the subtotal and total prices of products based on their prices and
 * quantities, and updates the corresponding elements in the HTML.
 */
function calc_sub_and_total(){
  sub_total = 0; // Reset sub_total to 0 before re-calculating
  $('.prod-review').each(function () {
    console.log("checking this ")
    var review_price = parseFloat($(this).find('.prod-review-price').text().replace('$', ''))
    var review_quantity = parseInt($(this).find('.prod-review-quant').text());
    console.log("testing prices ", review_price)
    console.log("testing quants ", review_quantity)
    sub_total += review_price * review_quantity; 
    
  })
  total = sub_total + shipping;
  console.log("?????")
  $("#review-subtotal").text('$' + sub_total.toFixed(2));
  $("#review-total").text('$' + total.toFixed(2));
  $("#review-shipping").text('$' + shipping.toFixed(2));

}

/**
 * The function removeFromReviewCart removes a product from the review cart, updates the subtotal and
 * total, updates the storage, and disables the place order button if the cart is empty.
 * @param e - The parameter "e" is likely an event object that is passed to the function when it is
 * triggered by an event, such as a button click.
 */
function removeFromReviewCart(e) {
  e.closest('.prod-review').remove()
  calc_sub_and_total();
  update_storage();
  if (isEmpty()) {
    cartEmptyText()
    $('#placeOrder').prop("disabled", true);
        $('#placeOrder').addClass("disabled-checkout-btn");
  }
  else {
    $('#placeOrder').prop("disabled", false);
    $('#placeOrder').removeClass("disabled-checkout-btn");
}
}


/**
 * The function checks if the element with class "checkout-review-products" has any child elements and
 * returns true if it does not.
 * @returns a boolean value indicating whether the ".checkout-review-products" element has any child
 * elements or not.
 */
function isEmpty() {
  console.log("empty review? ", $(".checkout-review-products").children().length === 0)
  console.log("empty review? ", $(".checkout-review-products").children())
  return $(".checkout-review-products").children().length === 0
}

/**
 * The function `cartEmptyText` appends a table cell with a message indicating that the cart is empty.
 */
function cartEmptyText() {
  $(".review-cart-table").append(`<td class="empty_review_cart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
}

/**
 * The function `update_storage` updates the localStorage with the products in the cart.
 */
function update_storage() {
    var products = [];
    console.log("final cart contains anything? ", products);
    $('.prod-review').each(function () {
        var product_data = {
            name: $(this).find(".prod-review-name").text(),
            price: parseFloat($(this).find(".prod-review-price").text().replace('$', '')).toFixed(2),
            quantity: parseInt($(this).find(".prod-review-quant").val()),
            img_url: $(this).find(".prod-review-img").attr("src")
        };
        products.push(product_data);

    })
    console.log("my storage products: ", products)
    localStorage.setItem('cart_prod', JSON.stringify(products));
}

