package com.example.market_ms.model;
import com.example.market_ms.lib.AbstractEntity;
import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@ToString
public class Wishlist extends AbstractEntity<Wishlist> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Auto-generated primary key

    @ManyToMany
    @JoinTable(
            name = "wishlist_products",
            joinColumns = @JoinColumn(name = "wishlist_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    // Other fields and methods specific to your Wishlist entity
}
