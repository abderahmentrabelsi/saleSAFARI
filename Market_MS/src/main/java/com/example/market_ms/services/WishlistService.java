package com.example.market_ms.services;


import com.example.market_ms.lib.AbstractCrudService;
import com.example.market_ms.model.Product;
import com.example.market_ms.model.Wishlist;
import com.example.market_ms.repository.ProductRepository;
import com.example.market_ms.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import wishlistdto
import com.example.market_ms.dto.WishlistDto;
//Import modelmapper

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService extends AbstractCrudService<Wishlist> {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository; // Assuming you have a ProductRepository
    public Wishlist addProductsToWishlist(Integer wishlistId, List<Integer> productIds) {
        // Find the wishlist by ID
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        // Find the products by their IDs
        List<Product> productsToAdd = productRepository.findAllById(productIds);

        // Add the selected products to the wishlist
        wishlist.getProducts().addAll(productsToAdd);

        // Save the updated wishlist
        return wishlistRepository.save(wishlist);
    }

    public void removeProductFromWishlists(Product product) {
        // Find all wishlists
        List<Wishlist> wishlists = wishlistRepository.findAll();

        // Iterate through wishlists and remove the product
        for (Wishlist wishlist : wishlists) {
            if (wishlist.getProducts().contains(product)) {
                wishlist.getProducts().remove(product);
                wishlistRepository.save(wishlist);
            }
        }
    }




}
