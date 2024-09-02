package com.example.AVA.AVAController;

import com.example.AVA.Repo.UserRepository;
import com.example.AVA.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/accounts")
public class AVAController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public List<User> getAll() {
        return userRepository.getAll();
    }

    @GetMapping("/getUsernames")
    public List<User> getUsernames() {return userRepository.getUsernames();}

    @DeleteMapping("/delete/{username}")
    public int deleteByUsername(@PathVariable("username") String username) {
       return userRepository.deleteByUsername(username);
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") int id) {
        return userRepository.getById(id);
    }

    @GetMapping("/acc/{username}")
    public User getByUsername(@PathVariable("username") String username) {return userRepository.getByUsername(username);}


    @PostMapping("/")
    public int add(@RequestBody List<User> users) {
        return userRepository.save(users);
    }


    @GetMapping("/password")
    public List<String> getPasswords(){
        return userRepository.getPasswords();
    }

    @GetMapping("/pass/{username}")
    public String getPasswordByUsername(@PathVariable("username") String username) {
        return userRepository.getPasswordByUsername(username);
    }

    @PutMapping("/{username}")
    public String update(@RequestBody List<User> users, @PathVariable("username") String username) {
        return userRepository.update(users, username);
    }

    @GetMapping("/ace/{username}")
    public User getUserWithName(@PathVariable("username") String username) {
        return userRepository.getUserWithName(username);
    }

    @PutMapping("/updateDate/{username}")
    public String updateDate(@RequestBody List<User> users, @PathVariable("username") String username
                             ){
        return userRepository.updateDate(users, username);
    }

}
