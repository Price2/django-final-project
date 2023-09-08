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
});