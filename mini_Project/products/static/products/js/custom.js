/******************************************
    File Name: custom.js
*******************************************/

"use strict";

/**== wow animation ==**/

new WOW().init();

/**== loader js ==*/

$(window).load(function() {
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

// script.js
$(document).ready(function() {  
    $('#cartModal').modal('show');
});

function isEmpty() {
    return $(".cart-body").children().length === 0
}

var itemCount = 0;
  $(document).ready(function () {
      $(document).on("click", ".addToCart", function (e) {
          var prod_name = $(this).closest(".product_list").find(".prod_name").text();
            // var prod_price = $(this).closest(".product_detail_btm").find(".prod_price").text();
          var prod_price = $(this).closest(".product_list").find('.prod_price').text();
          var prod_img = $(this).closest(".product_list").find(".prod_img").attr("src");
          
        console.log("product price ", $(this).closest(".product_list").find('.prod_price').text()    )
        addToCart({ "prod_name": prod_name, "prod_price": prod_price, "prod_img_url": prod_img })
        itemCount++;
        $("#cart-counter").text(itemCount);
        console.log("prod name: " + prod_name + " prod_price: " + prod_price + " prod img: " + prod_img);
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
           <!-- <tr>
             <td><img class="img-fluid" src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww&w=1000&q=80" alt=""></td>
             <th scope="row">1</th>
             <td>100$</td>
             <td class='d-flex'><button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button></td>
           </tr> -->
         </tbody>
            <td class="emptycart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
        }
        else {
            $(".emptycart_text").remove()
        }
    })
    
    update_total();
});
function cartEmptyText() {
    $(".table-hover").append(`<td class="emptycart_text" colspan="5"><h2 class="d-flex justify-content-center font-weight-normal" style="font-family:'Roboto'">Your cart is empty!</h2></td>`)
}

function removeFromCart(e) {
    e.closest("tr").remove();
    if (isEmpty()) {
        cartEmptyText()
    }
    itemCount--
    $("#cart-counter").text(itemCount);
    update_total()

}
function addToCart(product, removeFromCart){
    $(".cart-body").append(`<tr class="prod_info">
    <td class="w-25"><img class="img-fluid w-75" src="${product.prod_img_url}" alt=""></td>
    <th scope="row">${product.prod_name}</th>
    <td class="cart_prod_price">${product.prod_price}</td>
    <td><input type="number" class="cart-quantity" name="quantity" value=1 min="1" style="width: 40px;"></td>
    <td class='d-flex'><button onClick="removeFromCart(this)" type="button" class="close" aria-label="Close">
     <span aria-hidden="true">&times;</span>
   </button></td>
  </tr>`)
  update_total()
    
}

function update_total(e) {
    var total = 0;
    console.log("update?")
    $('.prod_info').each(function() {
        var quantity = parseInt($(this).find('.cart-quantity').val()); // 'this' refers to the input field
        var price = parseFloat($(this).closest('.prod_info').find('.cart_prod_price').text().replace('$', ''));
        console.log("price ?", price, " quantity: ", $(this).find('.cart-quantity').val())
        total += quantity * price;
      });
      $('#total').text('$' + total.toFixed(2));
    
 }

$(document).on('input', '.cart-quantity', function() {
     update_total();
  });
  


/**===== End slider =====**/
	
	
/** header fixed js **/

$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
       $('.header_fixed_on_scroll').addClass('fixed-header');
    }
    else {
       $('.header_fixed_on_scroll').removeClass('fixed-header');
    }
});

	
	
	