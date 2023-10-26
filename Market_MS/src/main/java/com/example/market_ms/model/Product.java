package com.example.market_ms.model;
import com.example.market_ms.lib.AbstractEntity;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
public class Product extends AbstractEntity<Product> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated value
    private Integer id;

    @Column// Specify the column name
    private String name;

    @Column // Specify the maximum length for the description column
    private String description;

    @Column// Specify the column name
    private double price;

    @Column // Specify the column name
    private int qty;

    @Column // Specify the column name
    private double rating;

    @Column
    private String slug;

    @Column// Specify the column name
    private boolean isInWishlist;

    @Column
    private String brand;

    @Column // Specify the column name
    private boolean isInCart;

    @Column
    private String image;

    // Getters and setters for the fields

    //ManyToMany with wishlist
    @ManyToMany(mappedBy = "products")
     private List<Wishlist> wishlists;


}
