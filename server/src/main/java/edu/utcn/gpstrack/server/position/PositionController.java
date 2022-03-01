package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @PostMapping(value = "/create")
    public PositionDTO create(@RequestBody PositionDTO position) {
        return positionService.create(position);
    }

    @GetMapping
    public List<PositionDTO> readAll() {
        return positionService.readAll();
    }

    @PutMapping(value = "/{id}")
    public PositionDTO update(@PathVariable Integer id, @RequestBody PositionDTO position) {
        return positionService.update(id, position);
    }

    @DeleteMapping(value = "/{id}")
    public PositionDTO delete(@PathVariable Integer id) {
        return positionService.delete(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/readBetween")
    public List<PositionDTO> readBetween(@RequestParam(name = "terminalId", defaultValue = "02:00:00:00:00:00") String terminalId,
                                         @RequestParam(name = "startDate", defaultValue = "2000-01-01") String startDate,
                                         @RequestParam(name = "endDate",  defaultValue = "2100-01-01") String endDate) throws ParseException {
        return positionService.readBetween(terminalId, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(startDate), new SimpleDateFormat("yyyy-MM-dd").parse(endDate));
    }
}
