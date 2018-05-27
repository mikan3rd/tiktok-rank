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
        console.log(this.props);
        const {params, naviShop} = this.props;
        const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(params.get('latitude'), params.get('longitude')),
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
      return (
        <GoogleMap
          zoom={15}
          fullscreenControl={true}
          defaultCenter={{lat: props.params.get('latitude'), lng: props.params.get('longitude')}}
        >
          <Marker
            position={{
              lat: Number(props.naviShop.lat),
              lng: Number(props.naviShop.lng)
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

  render () {
    const {index} = this.props;
    const {
      params,
      naviShop
    } = index;

    console.log(naviShop);

    return (
      <Page renderToolbar={this.renderToolbar}>
        <MyMapComponent
          params={params}
          naviShop={naviShop}
        />
      </Page>
    );
  }
}

export default Navigation;