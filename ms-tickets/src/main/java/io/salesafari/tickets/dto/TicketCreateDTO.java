package io.salesafari.tickets.dto;

import lombok.Data;

@Data
public class TicketCreateDTO {

    private String title;
    private String test;
    private String status;
    private String userId;

    // getters and setters
}
