package edu.utcn.gpstrack.server.position;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.CreationTimestamp;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    private Integer id;

    private String terminalId;

    private String latitude;

    private String longitude;

    @Column(updatable = false, nullable = false)
    /*@CreationTimestamp*/
    @ApiModelProperty(hidden = true)
    private Date creationDate;
}
