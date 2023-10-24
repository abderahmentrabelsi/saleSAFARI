package tn.esprit.cartms.entity;

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
    @GeneratedValue
    private int id;

    private int quantity;
    private long total;

    @ManyToOne
    @JoinColumn(name="cartId")
    private Cart cart;
}
