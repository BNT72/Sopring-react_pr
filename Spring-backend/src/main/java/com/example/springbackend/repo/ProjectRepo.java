package com.example.springbackend.repo;

import com.example.springbackend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {

    List<Project> findAllByOrderByIdAsc();

}
