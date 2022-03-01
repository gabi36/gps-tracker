package edu.utcn.gpstrack.server.user;

import edu.utcn.gpstrack.server.security.response.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000", maxAge = 5000)
    @PostMapping
    public ResponseEntity<JwtResponse> login(@RequestBody UserDTO userDto) {
        return userService.login(userDto);
    }

    @PostMapping(value = "createUser")
    public UserDTO save(@RequestBody UserDTO userDTO){
        return  userService.create(userDTO);
    }
}
