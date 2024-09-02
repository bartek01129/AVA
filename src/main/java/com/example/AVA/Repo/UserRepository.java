package com.example.AVA.Repo;

import com.example.AVA.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<User> getAll() {
        return jdbcTemplate.query("SELECT id ,username ,password, weight,height,sex,age,goal  FROM account", BeanPropertyRowMapper.newInstance(User.class));
    }

    public List<User> getUsernames() {
        return jdbcTemplate.query("SELECT username  FROM account", BeanPropertyRowMapper.newInstance(User.class));
    }

    public int deleteByUsername(String username) {
        jdbcTemplate.update("DELETE FROM account WHERE username = ?", username);
        return 777;
    }

    public User getByUsername(String username) {
        return jdbcTemplate.queryForObject("SELECT username,password, weight, height, sex, age, goal, lastDate FROM account WHERE username = ?",
                BeanPropertyRowMapper.newInstance(User.class), username);
    }

    public User getById(int id) {
        return jdbcTemplate.queryForObject("SELECT id ,username ,password FROM account WHERE id = ?", BeanPropertyRowMapper.newInstance(User.class), id);
    }

    public List<String> getPasswords() {
        return jdbcTemplate.queryForList("SELECT password FROM account", String.class);
    }

    public String getPasswordByUsername(String username) {
        return jdbcTemplate.queryForObject("SELECT password FROM account WHERE username = ?", String.class, username);
    }

    public int save(List<User> users) {
        users.forEach(user -> jdbcTemplate.update("INSERT INTO account(username, password, weight, height, sex, age, goal, lastDate) VALUES(?, ?, ?, ?, ?, ?, ?,?)",
                user.getUsername(), user.getPassword(), user.getWeight(), user.getHeight(), user.getSex(), user.getAge(), user.getGoal(),user.getLastDate()));

        return 1;

    }

    public String update(List<User> users, String username) {
        users.forEach(user -> jdbcTemplate.update("update account set password=?, height=?, weight=?, goal=? WHERE username=?",
                user.getPassword(), user.getHeight(), user.getWeight(), user.getGoal(), username));
        return "udało się";
    }

    public String updateDate(List<User> users, String username) {
        users.forEach(user -> jdbcTemplate.update("update account set lastDate=? WHERE username=?",
                user.getLastDate(), username));
        return "updated";
    }



    public User getUserWithName(String username) {
        return jdbcTemplate.queryForObject("Select * from account WHERE username=?", BeanPropertyRowMapper.newInstance(User.class), username);
    }



}
