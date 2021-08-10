package com.example.springbackend.controller;

import com.example.springbackend.exeption.ResourceNotFoundException;
import com.example.springbackend.model.Comment;
import com.example.springbackend.model.Issue;
import com.example.springbackend.repo.CommentRepo;
import com.example.springbackend.repo.IssueRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class IssueController {

  private final IssueRepo issueRepo;

  private final CommentRepo commentRepo;


  public IssueController(IssueRepo issueRepo, CommentRepo commentRepo) {
    this.issueRepo = issueRepo;
    this.commentRepo = commentRepo;
  }


  @GetMapping("/employees")
  public List<Issue> getAllEmployees() {
    return issueRepo.findAllByOrderByIdAsc();
  }




  @PostMapping("/employees")
  public Issue createEmployee(@RequestBody Issue issue) {

    issue.setDate(LocalDateTime.now());
    return issueRepo.save(issue);
  }





  @PostMapping("/employees/{id}")
  public ResponseEntity<Comment> createComment(@PathVariable Long id,@RequestBody Comment comment) {

    comment.setLocalDateTime(LocalDateTime.now());
    Issue issue=issueRepo.getById(id);
    comment.setIssue(issue);

    issue.setStatus(comment.getStatus());
    issueRepo.save(issue);



    return ResponseEntity.ok(commentRepo.save(comment)) ;
  }


  @GetMapping("/employees/{id}")
  public ResponseEntity<Issue> getEmployeeById(@PathVariable Long id) {
    Issue employee =
            issueRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist"));


    return ResponseEntity.ok(employee);
  }



  @PutMapping("/employees/{id}")
  public ResponseEntity<Issue> updateEmployee(
      @PathVariable Long id, @RequestBody Issue issueDetails) {
    Issue issue =
            issueRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Issue not exist"));

    issue.setStatus(issueDetails.getStatus());
    issue.setAuthor(issueDetails.getAuthor());
    issue.setDescriptions(issueDetails.getDescriptions());


    Issue updateEmployee = issueRepo.save(issue);
    return ResponseEntity.ok(updateEmployee);
  }



  @DeleteMapping("/employees/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
    Issue issue =
            issueRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist"));
//    commentRepo.deleteAllByIssue(Collections.singleton(id));

    issueRepo.delete(issue);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
