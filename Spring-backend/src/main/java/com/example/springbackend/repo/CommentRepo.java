package com.example.springbackend.repo;


import com.example.springbackend.model.Comment;
import com.example.springbackend.model.Issue;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepo extends CrudRepository<Comment,Long> {


    @Query("delete from Comment b where b.issue=:issue")
  void deleteAllByIssue(Long issue);
}
