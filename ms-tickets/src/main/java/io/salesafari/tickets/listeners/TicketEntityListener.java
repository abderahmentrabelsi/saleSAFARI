package io.salesafari.tickets.listeners;

import io.salesafari.tickets.entities.Ticket;
import io.salesafari.tickets.services.TicketEventService;
import jakarta.persistence.PostPersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketEntityListener {

    @Autowired
    private TicketEventService ticketEventService;

    @PostPersist
    public void postPersist(Ticket target) {
        ticketEventService.postTicketCreate(target);
    }
}