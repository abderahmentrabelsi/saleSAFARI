package com.example.market_ms.controller;


import com.example.market_ms.dto.ProductDto;
import com.example.market_ms.lib.AbstractCrudController;
//import the abstractcrud service

import com.example.market_ms.model.Product;
import com.example.market_ms.services.ProductService;
import com.example.market_ms.services.WishlistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/products", produces = "application/json")
public class ProductController extends AbstractCrudController<Product, ProductDto> {


    @Autowired
    private ProductService productService;

    @Autowired
    private WishlistService wishlistService; // Inject the WishlistService




    @DeleteMapping("/p/{productId}")
    public void deleteProduct(@PathVariable Integer productId) {
        // Find the product by ID
        Optional<Product> optionalProduct = Optional.ofNullable(productService.findById(productId));

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Remove the product from all wishlists
            wishlistService.removeProductFromWishlists(product);

            // Delete the product
            productService.delete(product);
        } else {
            // Log a message when the product is not found
            Logger logger = LoggerFactory.getLogger(ProductController.class);
            logger.error("Product not found with ID: " + productId);

            // You can also return a response or take other appropriate action here.
            // For example, you can return a 404 Not Found response.
        }
    }
}
