package com.example.springbackend.repo;

import com.example.springbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepo extends JpaRepository<User, String> {
    User findAllByName(String s);
}

