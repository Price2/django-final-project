
var maxPrice = 0
var minPrice = 9999999
$(document).ready(function () {
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

    $('.reset-filter').click(function (e) {
        $('.product-details').each(function () { 
            $(this).show()
        })
    })

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


    function calculateMaxPrice() {
        $('.product-details').each(function (index, element) {
            var product = parseFloat($(this).find('.prod_price').text().replace('$', ''))
            if (product > maxPrice) {
                maxPrice = product
            }
            
            
        });
        return maxPrice
    }

    function calculateMinPrice() {

        $('.product-details').each(function (index, element) {
            var product = parseFloat($(this).find('.prod_price').text().replace('$', ''))
            if (product < minPrice) {
                minPrice = product
            }
            
            
        });

        return minPrice
    }

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

