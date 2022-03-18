package com.example.springbackend.request;

import com.example.springbackend.model.Issue;

public class IssueRequest {

    private String author;
    private String descriptions;
    private String name;
    private String status;


    private String userId;


    private String projectId;
    private String issueInheritedId;

    public IssueRequest() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getIssueInheritedId() {
        return issueInheritedId;
    }

    public void setIssueInheritedId(String issueInheritedId) {
        this.issueInheritedId = issueInheritedId;
    }

    @Override
    public String toString() {
        return "IssueRequest{" +
                "name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", descriptions='" + descriptions + '\'' +
                ", author='" + author + '\'' +
                ", userId='" + userId + '\'' +
                ", projectId='" + projectId + '\'' +
                '}';
    }
}
