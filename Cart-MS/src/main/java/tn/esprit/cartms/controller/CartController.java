package tn.esprit.cartms.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.cartms.entity.Cart;
import tn.esprit.cartms.entity.Product;
import tn.esprit.cartms.entity.ProductDTO;
import tn.esprit.cartms.repository.CartRepository;
import tn.esprit.cartms.service.CartService;

import java.util.List;

@RestController
@CrossOrigin("*")
@Slf4j
public class CartController {



    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Cart Microservice";
    }

    @PostMapping("/addToCart")
    public String addToCart(@RequestParam String userId, @RequestBody ProductDTO product) {
        cartService.addProductToCart(userId,product);
        return "Added to cart successfully";
    }

    @DeleteMapping("/clearCart")
    public String clearCart(@RequestParam String userId) {
        cartService.clearCart(userId);
        return "Cart cleared successfully";
    }

    @GetMapping("/getCart")
    public Cart getCart(@RequestParam String userId) {
        log.info("getting cart for user: " + userId);

        if (cartService.findByUserId(userId) == null) {
            return new Cart();
        }
        return cartService.findByUserId(userId);
    }

    @GetMapping("/getAllCarts")
    public List<Cart> getAllCarts() {
        log.info("getting all carts");
        return cartRepository.findAll();
    }

}
