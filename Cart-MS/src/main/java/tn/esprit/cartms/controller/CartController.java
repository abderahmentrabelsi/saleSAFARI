package tn.esprit.cartms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.cartms.entity.Product;
import tn.esprit.cartms.service.CartService;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Cart Microservice";
    }

    @PostMapping("/addToCart")
    public String addToCart(@RequestParam Integer userId) {
        cartService.addProductToCart(userId);
        return "Added to cart successfully";
    }

    @DeleteMapping("/clearCart")
    public String clearCart(@RequestParam Integer userId) {
        cartService.clearCart(userId);
        return "Cart cleared successfully";
    }

}
