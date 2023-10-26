package tn.esprit.cartms.service;

import tn.esprit.cartms.entity.Cart;
import tn.esprit.cartms.entity.Product;
import tn.esprit.cartms.entity.ProductDTO;

public interface ICartService {

    public void addProductToCart(String userId, ProductDTO product);
    public void clearCart(String userId);

    public Cart findByUserId(String userId);
}
