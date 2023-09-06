// $(document).ready(function () {
//     $('#checkoutBtn').click(function (e) {
//         // e.preventDefault(); // Prevent the default form submission behavior

//         // Retrieve data from localStorage
//         var cartData = localStorage.getItem('cart_prod');

//         // Define the data to send in the POST request
//         var postData = {
//             cartData: cartData,
//         };
//         const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//         console.log("post data: ", postData)
//         const request = new Request(
//             '/checkout',
//             {
//                 method: 'POST',
//                 headers: {
//                     'X-CSRFToken': csrftoken,
//                     'Content-Type': 'application/json',
//                 },
//                 mode: 'same-origin', // Do not send CSRF token to another domain.
//                 body: JSON.stringify(postData)
//             }
//         );
//         fetch(request).then(function(response) {
//            console.log("success? ", response)
//         });
       
//     });
// });

$(document).ready(function () {
    console.log("loaded? ", $('.checkout-review-products').length)

    if (localStorage.getItem('cart_prod')) {
        // Retrieve the data as a string from local storage
        const dataString = localStorage.getItem('cart_prod');
      
        try {
          // Parse the data string into an array of objects
          const dataArray = JSON.parse(dataString);
      
          // Get a reference to the HTML element where you want to display the products
            const productListContainer = $('.checkout-review-products')
      
          // Loop through the array of objects and create HTML elements for each product
          dataArray.forEach(product => {
              productListContainer.append(`
              <tr>
                      <th scope="row" class="border-0">
                        <div class="p-2">
                          <img src="${product.img_url}" alt="" width="70" class="img-fluid rounded shadow-sm">
                          <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${product.name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                          </div>
                        </div>
                      </th>
                      <td class="border-0 align-middle"><strong>$${product.price}</strong></td>
                      <td class="border-0 align-middle"><strong>${product.quantity}</strong></td>
                      <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
                    </tr>
            `)
          });
        } catch (error) {
          console.error('Error parsing data from local storage:', error);
        }
      } else {
        console.log('Data not found in local storage');
    }



    $("#placeOrder").on("click", function (e) {
        e.preventDefault();
        console.log("testing submit ")
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log("csrf? ", csrftoken)
        const request = new Request(
            'thanks',
            {
                method: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin' // Do not send CSRF token to another domain.
            }
        );
        fetch(request).then(function (response) {
            window.location.href = '/thanks'
         })
    })
    

});


