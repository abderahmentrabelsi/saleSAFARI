package com.example.market_ms.repository;

import com.example.market_ms.lib.AbstractRepository;
import com.example.market_ms.model.Product;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends AbstractRepository<Product>, JpaSpecificationExecutor<Product> {
}
