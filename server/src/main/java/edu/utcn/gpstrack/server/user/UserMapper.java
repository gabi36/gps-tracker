package edu.utcn.gpstrack.server.user;

public class UserMapper {
    public static UserDTO toDto(User entity) {
        UserDTO dto = new UserDTO();
        dto.setUsername(entity.getUsername());
        dto.setPassword(entity.getPassword());
        return dto;
    }

    public static User toEntity(UserDTO dto){
        User entity = new User();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        return entity;
    }
}
