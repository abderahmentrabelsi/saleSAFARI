package tn.esprit.cartms.entity;

import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart implements Serializable {

    @Id
    @GeneratedValue
    private int id;

    private int userId;

    @OneToMany(mappedBy = "cart")
    private List<Product> products;

    private long cartTotal;


}
