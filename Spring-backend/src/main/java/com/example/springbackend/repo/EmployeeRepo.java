package com.example.springbackend.repo;

import com.example.springbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    public List<Employee> findAllByOrderByIdAsc();

}
