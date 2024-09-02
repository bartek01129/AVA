package com.example.AVA.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private int id;
    private String username;
    private String password;
    private int weight;
    private int height;
    private String sex;
    private int age;
    private int goal;
    private String lastDate;

}
