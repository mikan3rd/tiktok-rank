/* global google */

import React from 'react';
import {Page, Toolbar,BackButton} from 'react-onsenui';
import { compose, withProps, lifecycle} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";

const KEY = "AIzaSyAN7zT17JCcOR61pvIhYizkGItFITEFE50"

const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        const {position, naviShop} = this.props;
        const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(position.lat, position.lng),
            destination: new google.maps.LatLng(Number(naviShop.lat), Number(naviShop.lng)),
            travelMode: google.maps.TravelMode.WALKING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({directions: result});
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
      }
    })
  )(props => {
      // const pastPosition = new google.maps.LatLng(props.pastPosition.lat, props.pastPosition.lng);
      // const position = new google.maps.LatLng(props.position.lat, props.position.lng);
      // const heading = google.maps.geometry.spherical.computeHeading(pastPosition, position);
      return (
        <GoogleMap
          zoom={15}
          fullscreenControl={true}
          defaultCenter={{lat: props.position.lat, lng: props.position.lng}}
        >
          <Marker
            position={{
              lat: Number(props.naviShop.lat),
              lng: Number(props.naviShop.lng)
            }}
          />
          <Marker
            position={{lat: props.position.lat, lng: props.position.lng}}
            icon={{
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              fillColor: "#0bb3ea",
              fillOpacity: 1,
              scale: 6,
              strokeWeight: 3,
              rotation: props.alpha,
            }}
          />
        <DirectionsRenderer
          directions={props.directions}
          options={{suppressMarkers: true}}
        />
        </GoogleMap>
      );
    });

class Navigation extends React.Component {

    constructor(props) {
      super(props)
      const params = this.props.index.params;
      this.state = {
        watchId: null,
        pastPosition: {
          lat: params.get('latitude'),
          lng: params.get('longitude'),
        },
        position: {
          lat: params.get('latitude'),
          lng: params.get('longitude'),
        },
        alpha: 0,
      }
    }

    componentWillMount = () => {
      const watchId = navigator.geolocation.watchPosition(
        this.successWatchPosition,
        this.failedWatchPosition,
        {enableHighAccuracy: true}
      );
      this.setState({watchId})
    }

    componentWillUnmount = () => {
      const {watchId} = this.state;
      navigator.geolocation.clearWatch(watchId);
    }

    successWatchPosition = (position) => {
      console.log(position);
      const {latitude, longitude}  = position.coords;
      this.setState({
        position: {lat: latitude, lng: longitude},
        pastPosition: this.state.position,
      });
    }

    failedWatchPosition = (error) => {
      console.log(error);
    }

    renderToolbar = () => {
      return (
          <Toolbar>
            <div className='left'>
              <BackButton>戻る</BackButton>
            </div>
            <div className='center'>GoogleMap</div>
        </Toolbar>
      );
    }

    deviceOrientationHandler = (event) => {
      // console.log(event);
      var alpha = 0;
      //Check for iOS property
      if (event.webkitCompassHeading) {
          alpha = event.webkitCompassHeading;
      }
      //non iOS
      else {
          alpha = event.alpha;
      }

      this.setState({alpha});
    }

  render () {
    const{
      position,
      pastPosition,
      alpha,
    } = this.state;

    const {index} = this.props;
    const {
      naviShop
    } = index;

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.deviceOrientationHandler, false);
    }

    return (
      <Page
        className="p-index"
        renderToolbar={this.renderToolbar}
      >
        <MyMapComponent
          position={position}
          pastPosition={pastPosition}
          naviShop={naviShop}
          alpha={alpha}
        />
      </Page>
    );
  }
}

export default Navigation;