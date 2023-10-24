package io.salesafari.tickets.services;

import io.salesafari.tickets.dto.CommentCreateDTO;
import io.salesafari.tickets.dto.CommentReadDTO;
import io.salesafari.tickets.entities.Comment;
import io.salesafari.tickets.repositories.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public CommentReadDTO createComment(CommentCreateDTO commentCreateDTO) {
        Comment comment = modelMapper.map(commentCreateDTO, Comment.class);
        comment = commentRepository.save(comment);
        return modelMapper.map(comment, CommentReadDTO.class);
    }

    public List<CommentReadDTO> getAllComments() {
        return commentRepository.findAll().stream()
                .map(comment -> modelMapper.map(comment, CommentReadDTO.class))
                .collect(Collectors.toList());
    }

    public CommentReadDTO getCommentById(Integer id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        return modelMapper.map(comment, CommentReadDTO.class);
    }

    public CommentReadDTO updateComment(Integer id, CommentCreateDTO commentCreateDTO) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        modelMapper.map(commentCreateDTO, comment);
        comment = commentRepository.save(comment);
        return modelMapper.map(comment, CommentReadDTO.class);
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}
