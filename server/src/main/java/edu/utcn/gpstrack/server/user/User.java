package edu.utcn.gpstrack.server.user;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    private Integer id;

    private String username;

    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
