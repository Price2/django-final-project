
var maxPrice = 0
var minPrice = 9999999
$(document).ready(function () {
    /* The code is handling the functionality of filtering the products based on a selected tag. When a
    filter item is clicked, it retrieves the text of the span element within the clicked item. It
    then iterates over each product detail element and compares the product category text with the
    filtered tag. If they do not match, the product detail element is hidden. If they match, the
    product detail element is shown. */
    $('.filter-item').click(function (e) { 
      
        const filtered_tag = $(this).find('span').text();
        $('.product-details').each(function () {
            const product_category = $(this).find('.prod-category').text();
            // $(this).removeClass("d-none")
            if (filtered_tag !== product_category) {
                $(this).hide()
            }
            else {
                $(this).show()
            }
        })
        
        
    });

 /* The code `$('.reset-filter').click(function (e) { $('.product-details').each(function () {
 $(this).show() }) })` is handling the functionality of resetting the filters. */
    $('.reset-filter').click(function (e) {
        $('.product-details').each(function () { 
            $(this).show()
        })
    })

/* This code is handling the functionality of searching for products based on a user's input. */
    $('.search-products').on('keyup', function (e) {
        var query = $(this).val().toLowerCase();


        $('.product-details').each(function () {
            var product = $(this).find('.prod_name').text().toLowerCase();
            if (product.indexOf(query) !== -1) {
                // Show the product if it matches the query
                $(this).show();
            } else {
                // Hide the product if it does not match the query
                $(this).hide();
            }
            
        });
    })
    

    const multiRangeSlider = $('#slider-round')[0];
    const minValueInput = $('#min-value');
    const maxValueInput = $('#max-value');

    calculateMinPrice();
    calculateMaxPrice();

    noUiSlider.create(multiRangeSlider, {
        start: [minPrice, maxPrice], // Initial range (min and max values)
        connect: true, // Connect handles with a line
        range: {
            'min': minPrice,
            'max': maxPrice
        }
    });

    multiRangeSlider.noUiSlider.on('update', function (values) {
        minValueInput.val(values[0]);
        maxValueInput.val(values[1]);
        showProductsInRange(values)
    });

    // Update the slider when the input values change
    minValueInput.on('change', function () {
        multiRangeSlider.noUiSlider.set([$(this).val(), null]);
    });

    maxValueInput.on('change', function () {
        multiRangeSlider.noUiSlider.set([null, $(this).val()]);
    });


    /**
     * The function calculates the maximum price among a list of products.
     * @returns the maximum price found among the product details.
     */
    function calculateMaxPrice() {
        $('.product-details').each(function (index, element) {
            var product = parseFloat($(this).find('.prod_price').text().replace('$', ''))
            if (product > maxPrice) {
                maxPrice = product
            }
            
            
        });
        return maxPrice
    }

   /**
    * The function calculates the minimum price among a list of products.
    * @returns The minimum price of the products.
    */
    function calculateMinPrice() {

        $('.product-details').each(function (index, element) {
            var product = parseFloat($(this).find('.prod_price').text().replace('$', ''))
            if (product < minPrice) {
                minPrice = product
            }
            
            
        });

        return minPrice
    }

   /**
    * The function `showProductsInRange` takes an array of two values and shows or hides product
    * details based on their price range.
    * @param values - The `values` parameter is an array containing two values. The first value
    * represents the minimum price range, and the second value represents the maximum price range. The
    * function `showProductsInRange` is used to filter and display only the products within the
    * specified price range.
    */
    function showProductsInRange(values) {
        $('.product-details').each(function (index, element) {
            var product = parseFloat($(this).find('.prod_price').text().replace('$', ''))
            if (product >= parseFloat(values[0]) && product <= parseFloat(values[1])) {
                $(this).show()
            }
            else {
                $(this).hide()
            }
        })
    }
});

