/******************************************
    File Name: custom.js
*******************************************/

"use strict";

/**== wow animation ==**/

new WOW().init();

/**== loader js ==*/

$(window).on('load',function() {
    $(".bg_load").fadeOut("slow");
})

/**== Menu js ==**/

$("#navbar_menu").menumaker({
	title: "Menu",
	format: "multitoggle"
});

/** counter js **/

    $('.counter-count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

/** progress_bar js **/
	
	 $(document).ready(function() {
      $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";
                }
        )
    });
	
/** Casestudies Tab_bar js **/	
	
	$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

/** google_map js **/

function myMap() {
var mapProp= {
    center:new google.maps.LatLng(40.712775,-74.005973),
    zoom:18,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

/**===== Slider =====**/

var tpj = jQuery;
var revapi4;
tpj(document).ready(function() {
    if (tpj("#rev_slider_4_1").revolution == undefined) {
        // revslider_showDoubleJqueryError("#rev_slider_4_1");
    } else {
        revapi4 = tpj("#rev_slider_4_1").show().revolution({
            sliderType: "standard",
            jsFileLocation: "revolution/js/",
            sliderLayout: "fullwidth",
            dottedOverlay: "none",
            delay: 7000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "zeus",
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 600,
                    hide_onleave: true,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    tmp: '<div class="tp-title-wrap"><div class="tp-arr-imgholder"></div></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    }
                },
                bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 600,
                    style: "metis",
                    hide_onleave: true,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    direction: "horizontal",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 30,
                    space: 5,
                    tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
                }
            },
            viewPort: {
                enable: true,
                outof: "pause",
                visible_area: "80%"
            },
            responsiveLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [700, 700, 500, 400],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "slidercenter",
                speed: 2000,
                levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
        });
    }



   
});



var itemCount = 0;
  $(document).ready(function () {
      $(document).on("click", ".addToCart", function (e) {
          var prod_name = $(this).closest(".product_list").find(".prod_name").text();
            // var prod_price = $(this).closest(".product_detail_btm").find(".prod_price").text();
          var prod_price = $(this).closest(".product_list").find('.prod_price').text().replace('$', '');
          var prod_img = $(this).closest(".product_list").find(".prod_img").attr("src");
          
        console.log("add to cart? ", prod_price)
        addToCart({ "prod_name": prod_name, "prod_price": prod_price, "prod_img_url": prod_img })
        itemCount++;
        $("#cart-counter").text(itemCount);
        // console.log("prod name: " + prod_name + " prod_price: " + prod_price + " prod img: " + prod_img);
    })
    
    $("#cart-icon").click(function () {
        // const is_empty = $("#modalCart .modal-body").children().length === 0
        console.log("empty? ",  $(".cart-body").children().length)
        if (isEmpty()) {
            console.log("im empty")
            $(".table-hover").html(`
            <thead>
           <tr>
             <th>#</th>
             <th>Product name</th>
             <th>Price</th>
             <th>Quantity</th>
             <th>Remove</th>
           </tr>
         </thead>
         <tbody class="cart-body">
          
         </tbody>
            <td class="emptycart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
            $('#checkoutBtn').prop("disabled", true);
            $('#checkoutBtn').addClass("disabled-checkout-btn");
        }
        else {
            $(".emptycart_text").remove()
            $('#checkoutBtn').prop("disabled", false);
            $('#checkoutBtn').removeClass("disabled-checkout-btn");
            // $('.checkout-btn').css({ "background-color":"#007bff", "border-color":"#007bff"});
        }
    })
   

      

      
    update_total();
    load_cart();
    checkLoginStatus();
      empty_order_history()
      
  });

  $(document).ready(function() {
    var currentUrl = window.location.pathname;
    console.log("current url ", currentUrl)
    // Iterate through the menu buttons
    $('.menu-btn').each(function() {
        var buttonUrl = $(this).attr('href');
        console.log("button url ", buttonUrl)
        // Check if the button's href matches the current URL
        if (currentUrl === buttonUrl) {
            $('.menu-btn').removeClass('active');
            $(this).addClass('active'); // Add the 'active' class
        }
    });
});

  

/**
 * The function checks if the order history is empty and appends a message if it is.
 */
function empty_order_history() {
    if ($('.order-history-body').children().length === 0) {
        $('.order-history-body').append(`<td class="empty_history" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">You have no orders!</h2></td>`)
    }
}
/**
 * The function checks if the body of the cart is empty by counting the number of children elements and
 * returns a boolean value.
 * @returns a boolean value indicating whether the cart body is empty or not.
 */
function isEmpty() {
    console.log("empty? ", $(".cart-body").children().length === 0)
    console.log("body of cart ", $(".cart-body").children())
    return $(".cart-body").children().length === 0
}

/**
 * The function `cartEmptyText` appends a table cell with a message indicating that the cart is empty.
 */
function cartEmptyText() {
    $(".table-hover").append(`<td class="emptycart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
}

/**
 * The function removes an item from the cart and updates the cart counter, total, and checkout button
 * status.
 * @param e - The parameter "e" is likely an event object that is passed to the function when it is
 * called. It is used to reference the element that triggered the event. In this case, it is used to
 * find the closest "tr" element (table row) and remove it from the DOM.
 */
function removeFromCart(e) {
    e.closest("tr").remove();
    if (isEmpty()) {
        cartEmptyText()
        $('#checkoutBtn').prop("disabled", true);
        $('#checkoutBtn').addClass("disabled-checkout-btn");
    }
    else {
        $('#checkoutBtn').prop("disabled", false);
        $('#checkoutBtn').removeClass("disabled-checkout-btn");
    }
    itemCount--
    $("#cart-counter").text(itemCount);
    update_total()
    save_product_changes()

}

/**
 * The function addToCart adds a product to the shopping cart and updates the total price.
 * @param product - The `product` parameter is an object that contains information about the product
 * being added to the cart. It should have the following properties:
 * @param removeFromCart - The `removeFromCart` parameter is a function that will be called when the
 * user clicks on the trash icon to remove the product from the cart.
 */
function addToCart(product, removeFromCart){
    $(".cart-body").append(`<tr class="prod_info"style=" flex: 1!important;
        margin: 5px!important;">
      <td class="w-25"><img class="img-fluid w-75 cart-img" src="${product.prod_img_url}" alt=""></td>
      <th scope="row" class="cart_prod_name">${product.prod_name}</th>
      <td class="cart_prod_price">$${product.prod_price}</td>
      <td><input type="number" class="cart-quantity" name="quantity" value=1 min="1" style="width: 40px;"></td>
      <td onClick="removeFromCart(this)">
    <i class="fa-solid fa-trash" style="cursor:pointer;"></i>
   </td>
    </tr>`)
    update_total()
    save_product_changes()
    
}

/**
 * The function calculates the total price of products in a shopping cart based on their quantity and
 * price.
 * @param e - The parameter "e" is typically used to represent the event object. It is commonly used in
 * event handlers to access information about the event that occurred, such as the target element or
 * the type of event. In this case, it seems that the "update_total" function is being called in
 * response to
 */
function update_total(e) {
    var total = 0;
    $('.prod_info').each(function () {
        var quantity = parseInt($(this).find('.cart-quantity').val()); // 'this' refers to the input field
        var price = parseFloat($(this).find('.cart_prod_price').text().replace('$', ''));
        console.log("price ?", price, " quantity: ", $(this).find('.cart-quantity').val())
        total += quantity * price;
      });
      $('#total').text('$' + total.toFixed(2));
    
}
 
/**
 * The function saves changes made to product information in a shopping cart to the browser's local
 * storage.
 */
function save_product_changes() {
    var products = [];
    console.log("storage contains anything? ", products);
    $('.prod_info').each(function () {
        var product_data = {
            name: $(this).find(".cart_prod_name").text(),
            price: parseFloat($(this).find(".cart_prod_price").text().replace('$', '')).toFixed(2),
            quantity: parseInt($(this).find(".cart-quantity").val()),
            img_url: $(this).find(".cart-img").attr("src")
        };
        products.push(product_data);

    })
    console.log("my storage products: ", products)
    localStorage.setItem('cart_prod', JSON.stringify(products));
}
    

$(document).on('input', '.cart-quantity', function() {
    update_total();
    save_product_changes();
  });
  
/**
 * The function `load_cart()` retrieves data from local storage, parses it into an array of objects,
 * and calls the `update_cart()` function with the parsed data.
 */
function load_cart() {
    if (localStorage.getItem('cart_prod')) {
        // Retrieve the data as a string from local storage
        const dataString = localStorage.getItem('cart_prod');
      
        try {
            // Parse the data string into an array of objects
            const dataArray = JSON.parse(dataString);
            itemCount = dataArray.length;
            update_cart(dataArray)

     
        } catch (error) {
            console.error('Error parsing data from local storage:', error);
        }
    } else {
        console.log('Data not found in local storage');
    }
}

/**
 * The function `update_cart` takes in an array of products and a function `removeFromCart`, and
 * appends the product information to the cart body element in the HTML, updating the cart counter and
 * total.
 * @param products - An array of objects representing the products in the cart. Each object should have
 * the following properties:
 * @param removeFromCart - The `removeFromCart` parameter is a function that is called when the user
 * clicks on the trash icon to remove a product from the cart. It is passed as an argument to the
 * `update_cart` function.
 */
function update_cart(products, removeFromCart) {
    console.log("products: " ,products)
    const product_body = $('.cart-body')
    console.log("body: ", product_body)
    products.forEach(product => {
        $('.cart-body').append(`<tr class="prod_info"style=" flex: 1!important;
        margin: 5px!important;">
      <td class="w-25"><img class="img-fluid w-75 cart-img" src="${product.img_url}" alt=""></td>
      <th scope="row" class="cart_prod_name">${product.name}</th>
      <td class="cart_prod_price">$${product.price}</td>
      <td><input type="number" class="cart-quantity" name="quantity" value=1 min="1" style="width: 40px;"></td>
      <td onClick="removeFromCart(this)">
    <i class="fa-solid fa-trash" style="cursor:pointer;"></i>
   </td>
    </tr>`)
  
    })
    $("#cart-counter").text(products.length)
    update_total()
}
  

/**
 * The function `checkLoginStatus` checks the login status of a user and updates the visibility of
 * login, register, and logout buttons accordingly.
 */
function checkLoginStatus() {
    console.log("checking?")
    $.ajax({
      url: '/check_login_status', // Replace with the actual URL
      method: 'GET',
      success: function (data) {
          if (data.is_authenticated) {
            console.log("authenticated?")
          // User is logged in
            $('#login').hide();
            $('#register').hide();
            $('#logout').show();
        } else {
          // User is not logged in
            $('#login').show();
            $('#register').show();
          $('#logout').hide();
        }
      },
    });
  }



/**===== End cart =====**/
	
	
/** header fixed js **/

$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
       $('.header_fixed_on_scroll').addClass('fixed-header');
    }
    else {
       $('.header_fixed_on_scroll').removeClass('fixed-header');
    }
});

	
	
	