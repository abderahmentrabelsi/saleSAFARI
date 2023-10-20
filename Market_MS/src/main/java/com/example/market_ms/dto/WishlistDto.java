package com.example.market_ms.dto;

import com.example.market_ms.lib.AbstractDto;
import com.example.market_ms.model.Product;
import com.example.market_ms.model.Wishlist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class WishlistDto extends AbstractDto<Wishlist> implements Serializable {
    private List<ProductDto> products; // List of ProductDto objects in the wishlist

}
