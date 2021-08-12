package com.example.springbackend.controller;

import com.example.springbackend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class AuthorizationController {

  @GetMapping("/usr")
  public ResponseEntity<User> main(@AuthenticationPrincipal User user) {

    return ResponseEntity.ok(user);
  }

  @GetMapping("/back")
  private String GoToBack() {
    return "redirect:http://localhost:3000/employees";
  }
}
