package edu.utcn.gpstrack.server.position;

import lombok.Data;

import java.util.Date;

@Data
public class PositionDTO {
    private String terminalId;
    private String longitude;
    private String latitude;
    private Date creationDate;
}
