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
//Entity Claim
public class Claim implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idClaim;

    private String fullName;

    private String orderNumber;

    private String productRef;

    private Date creationDate; // date de creation de réclamation par client

    private boolean treated; //traiter ou non par l'admin

    private Date processingDate; // date de traitement de réclamation par l'admin

    @Enumerated(EnumType.STRING)
    private ClaimSubject subject;

    private String subtheme; // chaque sujet des sous themes

    @Column(columnDefinition = "TEXT")
    private String description;

    private String cfile; // importer fichier pdf ou images par le client

    @Lob
    private byte[] qrcode;


    @Override
    public String toString() {
        return "Claim{" +
                "id=" + idClaim +
                ", fullname='" + fullName + '\'' +
                ", orderNumber=" + orderNumber +
                "productRef=" + productRef +
                ", creationDate='" + creationDate + '\'' +
                ", treated=" + treated +
                ", processingDate=" + processingDate +
                "subject=" + subject +
                ", subtheme='" + subtheme + '\'' +
                ", description=" + description +
                ", cfile=" + cfile +
                "qrcode=" + qrcode +
                '}';
    }



}
