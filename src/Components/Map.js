import React, { useState } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as strandings from "../strandings.json";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13
  });

  const [selectedStranding, setSelectedStranding] = useState(null);

  return (
    <div>
      <Container>
        <Row noGutters="True">
        <Col xs></Col>
         <Col xl ><ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle ="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"

          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {strandings.features.map(strand => (
            <Marker
              key={strand.properties.PARK_ID}
              latitude={strand.geometry.coordinates[0]}
              longitude={strand.geometry.coordinates[1]}
            >
              <button
                class="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  setSelectedStranding(strand);
                }}
              >
                <img src="/seal-face-svgrepo-com.svg" alt="seal-face" />
              </button>
            </Marker>
          ))}

          {selectedStranding ? (
            <Popup
              latitude={selectedStranding.geometry.coordinates[0]}
              longitude={selectedStranding.geometry.coordinates[1]}
              onClose={() => {
                setSelectedStranding(null);
              }}
            >
              <div>
                <h2> {selectedStranding.properties.SPECIES} </h2>
                <ul>
                  <li> {selectedStranding.properties.DESCRIPTION} </li>
                  <li> {selectedStranding.properties.AGE} </li> 
                  <li> {selectedStranding.properties.SEX} </li>

                </ul>
      
              </div>
            </Popup>
          ) : null}
          </ReactMapGL></Col>
          
        </Row>
          

      </Container>
      
    </div>
  );
}

export default Map;
