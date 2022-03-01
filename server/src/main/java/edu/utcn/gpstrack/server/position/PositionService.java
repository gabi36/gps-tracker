package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    public PositionDTO create(PositionDTO position) {
        Position positionEntity = PositionMapper.toEntity(position);
        positionRepository.save(positionEntity);
        return PositionMapper.toDto(positionEntity);
    }

    public List<PositionDTO> readAll(){
        return positionRepository.findAll()
                .stream()
                .map(PositionMapper::toDto)
                .collect(Collectors.toList());
    }

    public PositionDTO update(Integer id, PositionDTO position){
        Position positionSelected = positionRepository.getOne(id);
        positionSelected.setTerminalId(position.getTerminalId());
        positionSelected.setLongitude(position.getLongitude());
        positionSelected.setLatitude(position.getLatitude());
        positionRepository.save(positionSelected);
        return PositionMapper.toDto(positionSelected);
    }

    public PositionDTO delete(Integer id){
        Position positionEntity = positionRepository.getOne(id);
        positionRepository.delete(positionEntity);
        return PositionMapper.toDto(positionEntity);
    }

    public List<PositionDTO> readBetween(String terminalId, Date startDate, Date endDate) {
        return positionRepository.findAll()
                .stream()
                .filter(position -> position.getTerminalId().equals(terminalId))
                .filter(position -> position.getCreationDate().after(startDate))
                .filter(position -> position.getCreationDate().before(endDate))
                .map(PositionMapper::toDto)
                .collect(Collectors.toList());
    }
}