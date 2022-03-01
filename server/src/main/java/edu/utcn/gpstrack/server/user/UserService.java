package edu.utcn.gpstrack.server.user;

import edu.utcn.gpstrack.server.security.jwt.JwtUtils;
import edu.utcn.gpstrack.server.security.response.JwtResponse;
import edu.utcn.gpstrack.server.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;


    public ResponseEntity<JwtResponse> login(UserDTO userDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername()));
    }

    public UserDTO create(UserDTO userDTO){
        User user = new User(userDTO.getUsername(), encoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return UserMapper.toDto(user);
    }
}
