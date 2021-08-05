package com.example.springbackend.controller;

import com.example.springbackend.model.Employee;
import com.example.springbackend.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
  private final EmployeeRepo employeeRepo;

  public EmployeeController(EmployeeRepo employeeRepo) {
    this.employeeRepo = employeeRepo;
  }

  @GetMapping("/employees")
  public List<Employee> getAllEmployees() {
    return employeeRepo.findAll();
  }





}
