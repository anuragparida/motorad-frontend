import React, { useState } from "react";
import { Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const Markers = ({ center, index, label, address, id }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Marker
        position={{
          lat: parseFloat(center.lat),
          lng: parseFloat(center.long),
        }}
        onClick={() => {
          setShowInfo(true);
        }}
      >
        {showInfo && (
          <InfoWindow>
            <>
              <h4>
                <Link className="column-one" to={`/store/${id}`}>
                  {label}
                </Link>
              </h4>
              <p>{address}</p>
            </>
          </InfoWindow>
        )}
      </Marker>
      <Circle
        center={{
          lat: parseFloat(center.lat),
          lng: parseFloat(center.long),
        }}
        radius={2000}
        options={{
          fillOpacity: 0.025,
          strokeOpacity: 0.1,
          strokeWeight: 1,
          strokeColor: "#0000ff",
          fillColor: "#0000ff",
        }}
      />
    </>
  );
};

export default Markers;
