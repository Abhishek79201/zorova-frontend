import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getLiveLocation } from "../../features/providerSlicer";
import { useParams } from 'react-router-dom';

import {
    MapContainer,
    TileLayer,
    Marker, Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import moment from 'moment';


const customIcon = L.icon({
    iconUrl: '/employee/assets/images/navigation.png', // URL to your custom icon image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup anchor relative to the icon
});

export default function LiveLocation() {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.provider.provider);
    const { providerId } = useParams();

    const fetchLiveLocation = () => {
        dispatch(getLiveLocation({ providerId: providerId }));
      };

      useEffect(() => {
        fetchLiveLocation();
        const intervalId = setInterval(fetchLiveLocation, 5000); // Fetch location every 5 seconds
        return () => clearInterval(intervalId); // Cleanup function to clear interval
      }, [providerId]);

    return (
        <div className="container-fluid">
            <div className="col-12">
                <div className="card-header">
                    <h4 className="card-title">Provider Live Location</h4>
                </div>

                <div className="card-body">
                {location && location.length > 0 ? (
                    <MapContainer center={[location[0].latitude, location[0].longitude]} zoom={13} style={{ height: '500px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {location.map((locationItem, index) => (
                            <Marker key={index} position={[parseFloat(locationItem.latitude), parseFloat(locationItem.longitude)]} icon={customIcon}>
                                <Popup>
                                    Latitude: {locationItem.latitude}<br />
                                    Longitude: {locationItem.longitude} <br />
                                    Last Updated: {moment(locationItem.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                ) : (
                    <div>
                        Location services are disabled on the provider's phone.
                    </div>
                )}


</div>
            </div>
        </div>
    )
}
