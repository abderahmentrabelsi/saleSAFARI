package tn.esprit.cartms.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ProductDTO  implements Serializable {

    private int id;
    private String name;
    private String description;
    private int price;
    private int qty;
    private int rating;
    private String slug;
    private boolean isInWishlist;
    private String brand;
    private boolean isInCart;
    private String image;

}
