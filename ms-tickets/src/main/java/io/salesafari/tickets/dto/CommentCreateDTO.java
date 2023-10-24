package io.salesafari.tickets.dto;

import lombok.Data;

@Data
public class CommentCreateDTO {

    private String text;
    private String userId;
    private Integer ticketId;

}
