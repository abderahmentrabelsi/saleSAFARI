package tn.esprit.cartms.repository;

import tn.esprit.cartms.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(String userId);

}
