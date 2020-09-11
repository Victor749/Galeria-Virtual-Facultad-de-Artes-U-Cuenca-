import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
  NativeModules,
} from 'react-360';
import TourNavButton from 'TourNavButton.react';
import TourInfoButton from 'TourInfoButton.react';
import TourLoadingSpinner from 'TourLoadingSpinner.react';
import TourHotspot from 'TourHotspot.react';
import TourCylinderHotspot from 'TourCylinderHotspot.react';
import { ReactInstance } from 'react-360-web';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import lodash from 'lodash';


const BrowserInfo = NativeModules.BrowserInfo;
const MiModulo = NativeModules.MiModulo;
const AudioModule = NativeModules.AudioModule;
const ENV_TRANSITION_TIME = 500;

class BrowserBridge {
  constructor() {
      this._subscribers = {};
  }

  subscribe(handler) {
      const key = String(Math.random());
      this._subscribers[key] = handler;
      return () => {
          delete this._subscribers[key];
      };
  }

  notifyEvent(accion, dato1) {
      lodash.forEach(this._subscribers, handler => {
          handler(accion, dato1);
      });
  }
}

const browserBridge = new BrowserBridge();
BatchedBridge.registerCallableModule(/*BrowserBridge.name*/ 'BrowserBridge', browserBridge);


function play(estado, ambient){
  console.log(estado, ambient);
  if (estado == 'activo' && ambient) {
      AudioModule.playEnvironmental({
        source: asset(ambient.uri),
        volume: ambient.volume,
      });
    } else {
      AudioModule.stopEnvironmental();
    }
}


const Hotspot = (props) => {
  const {useDynamicSurface, mainSurfaceWidth, ...otherProps} = props;
  if (useDynamicSurface) {
    return <TourHotspot {...otherProps} />
  } else {
    return <TourCylinderHotspot {...otherProps} mainSurfaceWidth={mainSurfaceWidth} />
  }
};

class TourAppTemplate extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      locationId: null,
      nextLocationId: null,
      rotation: null,
      estado: null,
    };
    this.onBrowserEvent = this.onBrowserEvent.bind(this);
  }

  componentDidMount() {
    console.log('1');
    console.log(this.state);
    fetch('http://localhost:3000/museo/api/json')
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
        BrowserInfo.setLocationId(responseData.firstPhotoId);
      })
      .catch(e => {console.log(e)})
      .done();
      this.unsubscribe = browserBridge.subscribe(this.onBrowserEvent);
  }

  init(tourConfig) {
    // Initialize the tour based on data file.
    console.log('2');
    this.setState({
      data: tourConfig,
      locationId: null,
      nextLocationId: tourConfig.firstPhotoId,
      rotation: tourConfig.firstPhotoRotation +
        (tourConfig.photos[tourConfig.firstPhotoId].rotationOffset || 0),
      estado: 'inactivo',
    });
  }

  onBrowserEvent(info, dato1) {
    // Do action on event here
   // console.log(idSala, 'boom ya ');
  accion = info.split(';')[0];
   switch (accion) {
    case 'cambioSala':
      this.setState({
        nextLocationId: dato1,
      });
      this.render();
      break;
    case 'cambioAudio':
      this.setState({estado: info.split(';')[1]});
      play(this.state.estado, dato1);
      break;
    default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      break;
    }
    
  }

  componentWillUnmount() {
      if (this.unsubscribe) {
          this.unsubscribe();
          delete this.unsubscribe;
      }
  }
  

  render() {
    if (!this.state.data) {
      return null;
    }

    console.log('3');
    console.log(this.state);

    const {useDynamicSurface, mainSurfaceWidth, mainSurfaceHeight, handleModal} = this.props;
    const {locationId, nextLocationId, data} = this.state;
    const photoData = (locationId && data.photos[locationId]) || null;
    const tooltips = (photoData && photoData.tooltips) || null;
    const rotation =
      data.firstPhotoRotation + ((photoData && photoData.rotationOffset) || 0);
    const isLoading = nextLocationId !== locationId;
    const soundEffects = data.soundEffects;
    const ambient = data.soundEffects.ambient;
    const estado = this.state.estado;
    play(estado, ambient);
    BrowserInfo.setAmbient(ambient);

    if (nextLocationId !== locationId && this._loadingTimeout == null) {
      const nextPhotoData = (nextLocationId && data.photos[nextLocationId]) || null;
      const nextRotation =
        data.firstPhotoRotation + ((nextPhotoData && nextPhotoData.rotationOffset) || 0);
      Environment.setBackgroundImage(
        asset(data.photos[nextLocationId].uri),
        {
          format: '2D',
          transition: ENV_TRANSITION_TIME,
          // rotate the background image to the rotation offset so we are smoothly
          // transiting from one to another
          rotateTransform: [{rotateY: `${-nextRotation}deg`}],
        });
      this._loadingTimeout = setTimeout(() => {
        this._loadingTimeout = null;
        BrowserInfo.setLocationId(nextLocationId);
        this.setState({
          // Now that ths new photo is loaded, update the locationId.
          locationId: nextLocationId,
        });
      }, ENV_TRANSITION_TIME);
    }

    return (
    <View  style={{
      width: mainSurfaceWidth,
      height: mainSurfaceHeight,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {tooltips &&
        tooltips.map((tooltip, index) => {
          let rotationY = tooltip.rotationY + rotation;
          rotationY = (rotationY + 360) % 360; 
          let rotationX = tooltip.rotationX;
          let rotationZ = tooltip.rotationZ;
          const showOnLeft = !useDynamicSurface && rotationY > 180 && rotationY < 210;
          // Iterate through items related to this location, creating either
          // info buttons, which show tooltip on hover, or nav buttons, which
          // change the current location in the tour.
          if (tooltip.type) {
            console.log("Id obra index: ");
            // console.log(tooltip.idObra);
            // console.log(index);
            return (
              // Rotate the hotspot surface to the right hotspot position
              // We centered the view so the hotspot icon is on the right position
              <Hotspot
                key={tooltip.idObra}
                useDynamicSurface={useDynamicSurface}
                mainSurfaceWidth={mainSurfaceWidth}
                rotationY={rotationY}
                rotationX={rotationX}
                rotationZ={rotationZ}>
                <TourInfoButton
                  // Atribbution URI: https://www.freesound.org/people/ianstargem/sounds/278205/
                  onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                  showOnLeft={showOnLeft}
                  // Atribbution URI: https://freesvg.org/img/emblem-information.png
                  source={asset(data.info_icon)}
                  tooltip={tooltip}
                  metodo={MiModulo.doSomething}
                  obraId = {tooltip.idObra}
                />
              </Hotspot>
              
            );
          }
          return (
            // Rotate the hotspot surface to the right hotspot position
            // We centered the view so the hotspot icon is on the right position
            <Hotspot
              key={tooltip.linkedPhotoId}
              useDynamicSurface={useDynamicSurface}
              mainSurfaceWidth={mainSurfaceWidth}
              rotationY={rotationY}
              rotationX={rotationX}
              rotationZ={0}>
              <TourNavButton
                isLoading={isLoading}
                // Atribbution URI: https://www.freesound.org/people/fins/sounds/146721/
                onClickSound={asset(soundEffects.navButton.onClick.uri)}
                // Atribbution URI: https://www.freesound.org/people/ianstargem/sounds/278205/
                onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                onInput={() => {
                  // Update nextLocationId, not locationId, so tooltips match
                  // the currently visible pano; pano will update locationId
                  // after loading the new image.
                  this.setState({
                    nextLocationId: tooltip.linkedPhotoId,
                  });
                }}
                showOnLeft={showOnLeft}
                // Atribbution URI: https://commons.wikimedia.org/wiki/File:Chevron-up.svg
                source={asset(data.nav_icon)}
                textLabel={tooltip.text}
                rotZ={rotationZ}
              />
            </Hotspot>
          );
        })}
      </View>
    );
  }
}

// defining StyleSheet
const styles = StyleSheet.create({
  spinner: {
    width: 50,
    height: 50,
  },
});

// register the root component
// this will be used from client.js by r360.createRoot('TourAppTemplate' ...)
AppRegistry.registerComponent('TourAppTemplate', () => TourAppTemplate);
