
var sub_total = 0;
var total = 0;
var shipping = 10;
$(document).ready(function () {
    $('#placeOrder').click(function (e) {
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
    // console.log("loaded? ", JSON.parse(localStorage.getItem('cart_prod')).length)

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



    // $("#placeOrder").on("click", function (e) {
    //     e.preventDefault();
    //     console.log("testing submit ")
    //     const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    //     console.log("csrf? ", csrftoken)
    //     const request = new Request(
    //         'order/success',
    //         {
    //             method: 'POST',
    //             headers: {'X-CSRFToken': csrftoken},
    //             mode: 'same-origin' // Do not send CSRF token to another domain.
    //         }
    //     );
    //   fetch(request).then(response => {
    //     console.log("response url: " + response.url)
    //         // Manually redirect the user to the new URL
    //     if (response.url) {
    //       window.location.href = response.url;
    //     }    

    //     // Handle other responses if needed
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    // })
    
    calc_sub_and_total()

});

function calc_sub_and_total(){

  $('.prod-review').each(function () {
    console.log("checking this ")
    var review_price = parseFloat($(this).find('.prod-review-price').text().replace('$', ''))
    sub_total += review_price
    total = sub_total + shipping;
   
    $("#review-subtotal").text('$' + sub_total.toFixed(2));
    $("#review-total").text('$' + total.toFixed(2));
    $("#review-shipping").text('$' + shipping.toFixed(2));
  })

}

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


function isEmpty() {
  console.log("empty review? ", $(".checkout-review-products").children().length === 0)
  console.log("empty review? ", $(".checkout-review-products").children())
  return $(".checkout-review-products").children().length === 0
}

function cartEmptyText() {
  $(".review-cart-table").append(`<td class="empty_review_cart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
}

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

