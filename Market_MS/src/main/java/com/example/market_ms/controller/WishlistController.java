package com.example.market_ms.controller;


import com.example.market_ms.dto.WishlistDto;
import com.example.market_ms.lib.AbstractCrudController;
import com.example.market_ms.model.Product;
import com.example.market_ms.model.Wishlist;
import com.example.market_ms.services.ProductService;
import com.example.market_ms.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Wishlist addProductsToWishlist(@RequestBody Map<String, List<Integer>> requestData) {
        // Extract the product IDs from the "data" key in the JSON
        List<Integer> productIds = requestData.get("data");

        // Create a new wishlist entity
        Wishlist wishlist = new Wishlist();

        // Add the products to the wishlist
        List<Product> products = productService.findProductsByIds(productIds);
        wishlist.setProducts(products);

        // Save the wishlist to the database using the WishlistService
        wishlist = wishlistService.create(wishlist);

        return wishlist;
    }



}
