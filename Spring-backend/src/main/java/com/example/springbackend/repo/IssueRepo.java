package com.example.springbackend.repo;

import com.example.springbackend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepo extends JpaRepository<Issue, Long> {
  public List<Issue> findAllByOrderByIdAsc();
}
