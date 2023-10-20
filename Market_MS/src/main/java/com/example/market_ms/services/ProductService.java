package com.example.market_ms.services;

import com.example.market_ms.lib.AbstractCrudService;
import com.example.market_ms.model.Product;
import com.example.market_ms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService extends AbstractCrudService<Product>{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WishlistService wishlistService; // Inject the WishlistService


    public List<Product> findProductsByIds(List<Integer> productIds) {
        return productRepository.findAllById(productIds);
    }
    public void deleteProduct(Integer productId) {
        // Find the product by ID
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Remove the product from all wishlists
        wishlistService.removeProductFromWishlists(product);

        // Delete the product
        productRepository.delete(product);
    }


}
