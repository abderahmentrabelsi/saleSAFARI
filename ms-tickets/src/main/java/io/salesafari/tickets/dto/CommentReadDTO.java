package io.salesafari.tickets.dto;

import lombok.Data;

@Data
public class CommentReadDTO {

    private Integer id;
    private String text;
    private String userId;
    private Integer ticketId;

    // getters and setters
}
