package tn.esprit.cartms.service;

import tn.esprit.cartms.entity.Cart;
import tn.esprit.cartms.entity.Product;
import tn.esprit.cartms.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService  implements ICartService{

    @Autowired
    private CartRepository cartRepository;

    @Override
    public void addProductToCart(int userId) {
        Product product1 = Product.builder().id(1).total(100).quantity(2).build();
        Product product2 = Product.builder().id(2).total(200).quantity(3).build();
        Product product3 = Product.builder().id(3).total(300).quantity(4).build();
        List<Product> products = new ArrayList<Product>();
        products.add(product1);
        products.add(product2);
        products.add(product3);
        Cart cart = new Cart();
        cart.setProducts(products);
        cart.setUserId(userId);

        cart.setCartTotal(products.stream().mapToLong(Product::getTotal).sum());
        cartRepository.save(cart);

    }

    @Override
    public void clearCart(int userId) {
        Cart cart = cartRepository.findByUserId(userId);
        cartRepository.delete(cart);
    }
}
