package com.example.springbackend.controller;

import com.example.springbackend.exeption.ResourceNotFoundException;
import com.example.springbackend.model.Employee;
import com.example.springbackend.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    return employeeRepo.findAllByOrderByIdAsc();
  }

  @PostMapping("/employees")
  public Employee createEmployee(@RequestBody Employee employee) {
    return employeeRepo.save(employee);
  }

  @GetMapping("/employees/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
    Employee employee =
        employeeRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist"));
    return ResponseEntity.ok(employee);
  }

  @PutMapping("/employees/{id}")
  public ResponseEntity<Employee> updateEmployee(
      @PathVariable Long id, @RequestBody Employee employeeDetails) {
    Employee employee =
        employeeRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist"));

    employee.setFirstName(employeeDetails.getFirstName());
    employee.setLastName(employeeDetails.getLastName());
    employee.setEmail(employeeDetails.getEmail());

    Employee updateEmployee = employeeRepo.save(employee);
    return ResponseEntity.ok(updateEmployee);
  }

  @DeleteMapping("/employees/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
    Employee employee =
        employeeRepo
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist"));
    employeeRepo.delete(employee);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
