package com.example.springbackend.controller;

import com.example.springbackend.model.User;
import com.example.springbackend.repo.UserDetailsRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class AuthorizationController {

    final UserDetailsRepo userDetailsRepo;

    public AuthorizationController(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    @GetMapping("/usr")
    public ResponseEntity<User> main(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @PostMapping("/usr")
    public ResponseEntity<User> update(@RequestBody User user) {
//    User user=userDetailsRepo.findAllByName(username);
//    user.setRole(role);
        userDetailsRepo.save(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/back")
    private String GoToBack() {
        return "redirect:http://localhost:3000/issues";
    }

    @GetMapping("/usrs")
    public ResponseEntity<List<User>> main() {
        return ResponseEntity.ok(userDetailsRepo.findAll());
    }

}
