import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function MapComponent(props) {
  var containerStyle = {width:"100%",height: `280px`};
  const [markers, setMarkers] = React.useState(null)
  useEffect(()=>{
    // let off = document.getElementById("map_container").getBoundingClientRect().top
    // var hei = {height: `100vh`};
    // Object.assign(containerStyle,hei)
    let obj = {
        lat:props.cords.latitude,
        lng:props.cords.longitude
    }
    setMarkers(obj);
  },[]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCbUkneRBKytPcvUfHPRDt-7WMz8urY5Eo"
  })

  const [myMap, setMap] = React.useState(null)
  const [activeMarker, setActiveMarker] = React.useState(null)
  const divStyle = {
    background: "#FFFFFF",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)",
    color: "red",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "26px",
    letterSpacing: "-0.03em",
    borderRadius: "100px",
    padding: "1rem 2rem",
    zIndex: "1",
    position: "absolute"
  }
  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const activeMarkerhandler = (data) =>{
    if(activeMarker === data){
      setActiveMarker(null);
    }
    else{
      setActiveMarker(data);
    }
  }

  const locationSelected = (cords) =>{
    myMap.panTo(cords)
  }
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markers}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={markers} onClick={() => activeMarkerhandler("point-1")}>
        </Marker>
        
      </GoogleMap>
  ) : <></>
}
export default (MapComponent)
