package com.example.springbackend.controller;

import com.example.springbackend.exeption.ResourceNotFoundException;
import com.example.springbackend.model.Issue;
import com.example.springbackend.model.Project;
import com.example.springbackend.repo.IssueRepo;
import com.example.springbackend.repo.ProjectRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProjectController {

    private final ProjectRepo projectRepo;

    private final IssueRepo issueRepo;

    public ProjectController(ProjectRepo projectRepo, IssueRepo issueRepo) {
        this.projectRepo = projectRepo;
        this.issueRepo = issueRepo;
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepo.findAllByOrderByIdAsc();
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist"));
        return ResponseEntity.ok(project);
    }

    @PostMapping("/projects")
    public Project createProject(@RequestBody Project project) {
        System.out.println(project);
        return projectRepo.save(project);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist"));

        projectRepo.delete(project);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist"));

        project.setName(projectDetails.getName());

        Project updateProject = projectRepo.save(project);
        return ResponseEntity.ok(updateProject);
    }

    @PostMapping("/project/{id}")
    public ResponseEntity<Issue> createIssue(@PathVariable Long id, @RequestBody Issue issue) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist"));

        issue.setProject(project);

        return ResponseEntity.ok(issueRepo.save(issue));
    }

}
