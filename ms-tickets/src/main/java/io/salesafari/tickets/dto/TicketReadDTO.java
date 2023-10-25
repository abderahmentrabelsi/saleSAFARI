package io.salesafari.tickets.dto;

import lombok.Data;

import java.util.List;

@Data
public class TicketReadDTO {

    private Integer id;
    private String title;
    private String test;
    private String status;
    private String userId;
    private List<CommentReadDTO> comments;

    // getters and setters
}
