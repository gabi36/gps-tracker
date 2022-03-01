import React from "react";
import GoogleMapReact from 'google-map-react';
import './Marker.css'

export const SimpleMap = (props) => {
    const center = {lat: 46, lng: 23};
    const zoom = 8;

    return (
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyBuV3w7tYxmoYRtDrma7sYBaE70jelTczs'}}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {props.positions &&
                    props.positions.map(position => {
                        return (
                            <Marker
                                key={position.longitude+position.latitude}
                                lat={position.latitude}
                                lng={position.longitude}
                                color="red"/>
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    );
}

const Marker = (props) => {
    const {color} = props;
    return (
        <div className="marker"
             style={{backgroundColor: color, cursor: 'pointer'}}
        />
    );
};