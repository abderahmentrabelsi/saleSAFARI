package tn.esprit.cartms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private int price;
    private int rating;
    private String image;
    private int qty;
    private String slug;
    private String brand;
    private int quantity;
    private long total;

    @ManyToOne
    @JoinColumn(name="cartId")
    @JsonBackReference
    private Cart cart;
}
