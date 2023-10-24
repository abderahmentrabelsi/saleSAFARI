package io.salesafari.tickets.controllers;

import io.salesafari.tickets.dto.CommentCreateDTO;
import io.salesafari.tickets.dto.CommentReadDTO;
import io.salesafari.tickets.services.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Api(value = "Comment Management System")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    @ApiOperation(value = "Create a new comment")
    public ResponseEntity<CommentReadDTO> createComment(@RequestBody CommentCreateDTO commentCreateDTO) {
        return new ResponseEntity<>(commentService.createComment(commentCreateDTO), HttpStatus.CREATED);
    }

    @GetMapping
    @ApiOperation(value = "View a list of all comments")
    public ResponseEntity<List<CommentReadDTO>> getAllComments() {
        return new ResponseEntity<>(commentService.getAllComments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Get a comment by its id")
    public ResponseEntity<CommentReadDTO> getCommentById(@PathVariable Integer id) {
        return new ResponseEntity<>(commentService.getCommentById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "Update a comment")
    public ResponseEntity<CommentReadDTO> updateComment(@PathVariable Integer id, @RequestBody CommentCreateDTO commentCreateDTO) {
        return new ResponseEntity<>(commentService.updateComment(id, commentCreateDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete a comment")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
