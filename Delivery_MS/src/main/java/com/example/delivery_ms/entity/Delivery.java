package com.example.delivery_ms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.List;


import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "delivery")
public class Delivery implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String recipientname;

    @Column
    private String deliveryAddress;

    @Column
    private double deliveryCost;

    @Column
    private Long order_id;

    @Column
    private boolean isDelivered;

    @ManyToOne
    @JoinColumn(name = "deliveryMan") // Define the foreign key column
    @JsonBackReference
    private Courier deliveryMan;

    public Long getId() {
        return id;
    }

    public String getRecipientname() {
        return recipientname;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public double getDeliveryCost() {
        return deliveryCost;
    }

    public boolean isDelivered() {
        return isDelivered;
    }

    public Courier getDeliveryMan() {
        return deliveryMan;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRecipientname(String recipientName) {
        this.recipientname = recipientName;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public void setDeliveryCost(double deliveryCost) {
        this.deliveryCost = deliveryCost;
    }

    public void setIsDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    public void setDeliveryMan(Courier deliveryMan) {
        this.deliveryMan = deliveryMan;
    }

    public Long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }
}
