package tn.esprit.pidev.bns.entity.khalil;

import lombok.*;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Offer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOffer;

    private String namePer;
    private String shopName;

    @Enumerated(EnumType.STRING)
    private BusinessType businessType;

    private int businessPhoneNumber;

    private String businessEmail;

    private String description;

    private Date startDate;

    private Date endDate;



}

