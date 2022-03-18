package com.example.springbackend.controller;

import com.example.springbackend.exeption.ResourceNotFoundException;
import com.example.springbackend.model.Comment;
import com.example.springbackend.model.Issue;
import com.example.springbackend.repo.CommentRepo;
import com.example.springbackend.repo.IssueRepo;
import com.example.springbackend.repo.ProjectRepo;
import com.example.springbackend.repo.UserDetailsRepo;
import com.example.springbackend.request.IssueRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class IssueController {

    private final IssueRepo issueRepo;

    private final CommentRepo commentRepo;


    private final UserDetailsRepo userDetailsRepo;
    private final ProjectRepo projectRepo;

    public IssueController(IssueRepo issueRepo, CommentRepo commentRepo, UserDetailsRepo userDetailsRepo, ProjectRepo projectRepo) {
        this.issueRepo = issueRepo;
        this.commentRepo = commentRepo;
        this.userDetailsRepo = userDetailsRepo;
        this.projectRepo = projectRepo;
    }


    @GetMapping("/issues")
    public List<Issue> getAllIssues() {
        return issueRepo.findAllByOrderByIdAsc();
    }


    @PostMapping("/issues")
    public Issue createIssue(@RequestBody IssueRequest issueRequest) {
        Issue issue = new Issue();
        issue.setName(issueRequest.getName());
        issue.setStatus(issueRequest.getStatus());
        issue.setDescriptions(issueRequest.getDescriptions());
        issue.setAuthor(issueRequest.getAuthor());
        issue.setDate(LocalDateTime.now());
        issue.setUser(userDetailsRepo.getById(issueRequest.getUserId()));
        issue.setProject(projectRepo.getById(Long.parseLong(issueRequest.getProjectId())));
        issue.setIssueInherited(issueRepo.getById(Long.parseLong(issueRequest.getIssueInheritedId())));
        return issueRepo.save(issue);
    }


    @PostMapping("/issues/{id}")
    public ResponseEntity<Comment> createComment(@PathVariable Long id, @RequestBody Comment comment) {

        comment.setLocalDateTime(LocalDateTime.now());
        Issue issue = issueRepo.getById(id);
        comment.setIssue(issue);

        issue.setStatus(comment.getStatus());
        issueRepo.save(issue);


        return ResponseEntity.ok(commentRepo.save(comment));
    }


    @GetMapping("/issues/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        Issue issue =
                issueRepo
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Issue not exist"));


        return ResponseEntity.ok(issue);
    }


    @PutMapping("/issues/{id}")
    public ResponseEntity<Issue> updateIssue(
            @PathVariable Long id, @RequestBody Issue issueDetails) {
        Issue issue =
                issueRepo
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Issue not exist"));

        issue.setStatus(issueDetails.getStatus());
        issue.setAuthor(issueDetails.getAuthor());
        issue.setDescriptions(issueDetails.getDescriptions());
        issue.setDescriptions(issueDetails.getDescriptions());
        Issue updateIssue = issueRepo.save(issue);
        return ResponseEntity.ok(updateIssue);
    }


    @DeleteMapping("/issues/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteIssue(@PathVariable Long id) {
        Issue issue =
                issueRepo
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Issue not exist"));
        issueRepo.delete(issue);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
