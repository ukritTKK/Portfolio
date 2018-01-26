/* global google */
import { default as React, Component } from 'react'
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'
import { connect } from 'react-redux'

const MapsGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={10}
    center={props.center}
    defaultOptions={{
      scrollwheel: false
    }}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
))

/*
 *
 *  Add <script src="https://maps.googleapis.com/maps/api/js"></script>
 *  to your HTML to provide google.maps reference
 *
 *  @author: @chiwoojo
 */

export default class Maps extends Component {
  state = {
    center: {
      lat: 13.7244426,
      lng: 100.3529157
    },

    // array of objects of markers
    markers: this.props.garages.map((garages) => (
      {
        position: new google.maps.LatLng(garages.address_lat, garages.address_lng),
        showInfo: false,
        infoContent: (
          <h5>{garages.name}</h5>
        )
      }
    ))
  };

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick (targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true
          }
        }
        return marker
      })
    })
  }

  handleMarkerClose (targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
  }

  render () {
    return (
      <MapsGoogleMap
        containerElement={
          <div style={{height: '100%'}} />
        }
        mapElement={
          <div className="col-md-12" style={{ height: '100%' }} />
        }
        center={this.state.center}
        markers={this.state.markers}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    garages: state.garages
  }
}

connect(mapStateToProps)(Maps)
