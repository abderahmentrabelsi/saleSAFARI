package io.salesafari.tickets.repositories;

import io.salesafari.tickets.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    Collection<Ticket> findByUserId(String userId);
}
