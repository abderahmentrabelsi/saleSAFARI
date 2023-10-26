package tn.esprit.cartms.service;

import lombok.extern.slf4j.Slf4j;
import tn.esprit.cartms.entity.Cart;
import tn.esprit.cartms.entity.Product;
import tn.esprit.cartms.entity.ProductDTO;
import tn.esprit.cartms.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.cartms.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CartService  implements ICartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public void addProductToCart(String userId, ProductDTO product) {
        // Check if the product already exists in the repository
        Optional<Product> productOptional = Optional.ofNullable(productRepository.findByName(product.getName()));

        if (productOptional.isPresent()) {
            Product existingProduct = productOptional.get();

            // Check if the user has an existing cart
            Cart cart = cartRepository.findByUserId(userId);

            if (cart == null) {
                // If the user doesn't have a cart, create a new one
                cart = new Cart();
                cart.setUserId(userId);
                cart.setProducts(new ArrayList<>());
            }

            // Add the product to the user's cart
            existingProduct.setCart(cart);
            log.info("existing product: " + existingProduct);
            cart.getProducts().add(existingProduct);
            cart.setCartTotal(cart.getCartTotal() + existingProduct.getTotal());

            // Save or update the cart
            cartRepository.save(cart);
        } else {
            // If the product doesn't exist, save it and then add it to the cart
            // Set the product ID to the one sent with the request
            log.info("product id: " + product.getId());
            Product newProduct = new Product();
            newProduct.setName(product.getName());
            newProduct.setPrice(product.getPrice());
            newProduct.setQuantity(product.getQty());
            newProduct.setImage(product.getImage());
            newProduct.setDescription(product.getDescription());
            newProduct.setTotal(product.getPrice()*product.getQty());
            newProduct.setSlug(product.getSlug());
            newProduct.setBrand(product.getBrand());
            newProduct.setRating(product.getRating());
            productRepository.save(newProduct);



            // Check if the user has an existing cart
            Cart cart = cartRepository.findByUserId(userId);

            if (cart == null) {
                // If the user doesn't have a cart, create a new one
                cart = new Cart();
                cart.setUserId(userId);
                cart.setProducts(new ArrayList<>());
            }

            // Add the product to the user's cart
            newProduct.setCart(cart);  // Set the relationship from product to cart
            cart.getProducts().add(newProduct);
            cart.setCartTotal(cart.getCartTotal() + newProduct.getTotal());

            // Save or update the cart
            cartRepository.save(cart);
        }
    }

    @Override
    public void clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId);
        cartRepository.delete(cart);
    }

    @Override
    public Cart findByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }
}
