package com.example.market_ms.repository;

import com.example.market_ms.lib.AbstractRepository;
import com.example.market_ms.model.Product;
import com.example.market_ms.model.Wishlist;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WishlistRepository extends AbstractRepository<Wishlist>, JpaSpecificationExecutor<Wishlist> {
}
