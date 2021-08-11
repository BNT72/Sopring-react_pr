package com.example.springbackend.controller;

import com.example.springbackend.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/acc")
public class MainController {

  @GetMapping
  public User main(@AuthenticationPrincipal User user) {
    return user;
  }
}
