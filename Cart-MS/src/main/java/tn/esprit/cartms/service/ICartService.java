package tn.esprit.cartms.service;

public interface ICartService {

    public void addProductToCart(int userId);
    public void clearCart(int userId);
}
