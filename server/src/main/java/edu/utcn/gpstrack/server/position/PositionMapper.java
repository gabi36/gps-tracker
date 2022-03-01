package edu.utcn.gpstrack.server.position;

public class PositionMapper {

    public static PositionDTO toDto(Position entity) {
        PositionDTO dto = new PositionDTO();
        dto.setTerminalId(entity.getTerminalId());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setCreationDate(entity.getCreationDate());
        return dto;
    }

    public static Position toEntity(PositionDTO dto){
        Position entity = new Position();
        entity.setTerminalId(dto.getTerminalId());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setCreationDate(dto.getCreationDate());
        return entity;
    }
}