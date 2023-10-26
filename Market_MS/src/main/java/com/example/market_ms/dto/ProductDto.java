package com.example.market_ms.dto;

import com.example.market_ms.lib.AbstractDto;
import com.example.market_ms.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.example.market_ms.model.Product} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ProductDto extends AbstractDto<Product> implements Serializable {

    private String name;
    private String description;
    private double price;
    private int qty;
    private double rating;
    private String slug;
    private boolean isInWishlist;
    private String brand;
    private boolean isInCart;
    private String image;

}
