package com.example.market_ms.controller;


import com.example.market_ms.dto.WishlistDto;
import com.example.market_ms.lib.AbstractCrudController;
import com.example.market_ms.model.Product;
import com.example.market_ms.model.Wishlist;
import com.example.market_ms.services.ProductService;
import com.example.market_ms.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
//import wishlistdto
//import modelmapperconfig




import java.util.List;
import java.util.Map;
//import the abstractcrud contr


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/wishlist", produces = "application/json")
public class WishlistController extends AbstractCrudController<Wishlist, WishlistDto> {

    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private ProductService productService;


    @PostMapping("/add-products")
    public ResponseEntity<String> addProductsToWishlist(@RequestBody Map<String, List<Integer>> requestData) {
        // Extract the product IDs from the "data" key in the JSON
        List<Integer> productIds = requestData.get("data");

        try {
            // Create a new wishlist entity
            Wishlist wishlist = new Wishlist();

            // Add the products to the wishlist
            List<Product> products = productService.findProductsByIds(productIds);
            wishlist.setProducts(products);

            // Save the wishlist to the database using the WishlistService
            wishlist = wishlistService.create(wishlist);

            // Return a response to indicate that the product was added to the wishlist
            return ResponseEntity.ok("Product(s) added to wishlist");
        } catch (Exception e) {
            // Log the error
            System.out.println("Failed to add product(s) to wishlist: " + e.getMessage());

            // Return a response to indicate the failure
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product(s) to wishlist");
        }
    }




}
