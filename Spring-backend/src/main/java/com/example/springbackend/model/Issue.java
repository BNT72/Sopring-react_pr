package com.example.springbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javassist.bytecode.ByteArray;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime date;

    private String name;
    private String status;

    private String descriptions;
    private String author;

    private byte[] itemImage;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.REMOVE)

    private List<Comment> comments;



    public Issue() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }


    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    public void addComment(Comment comment)
    {
        this.comments.add(comment);
    }

    public byte[] getItemImage() {
        return itemImage;
    }

    public void setItemImage(byte[] itemImage) {
        this.itemImage = itemImage;
    }

    @Override
    public String toString() {
        return "Issue{" +
                "id=" + id +
                ", date=" + date +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", descriptions='" + descriptions + '\'' +
                ", author='" + author + '\'' +
                ", comments=" +
                '}';
    }
}
