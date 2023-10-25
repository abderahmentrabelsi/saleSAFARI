package io.salesafari.tickets.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.AbstractPersistable;
import io.salesafari.tickets.listeners.TicketEntityListener;

@Getter
@Setter
@Entity
@Table(name = "tickets")
@EntityListeners(TicketEntityListener.class)
public class Ticket extends AbstractPersistable<Integer> {
    @Column
    private String title;

    @Column
    private String test;

    @Column
    private String status;

    @Column
    private String userId;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private java.util.List<Comment> comments;
}