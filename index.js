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
//const { jsPDF } = require("jspdf");
//import cookie from 'react-cookie';
//import Cookies from 'universal-cookie';
//import { CookiesProvider } from 'react-cookie';
//import client from './client.js';
//import Cookies from 'js-cookie';
//const { useContext, createContext } = React;
//import ReactDOM from 'react-dom';
//import menu from 'menu';
//import {withCookies} from 'react-cookie';

//const cookies = new Cookies();


//import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';



const BrowserInfo = NativeModules.BrowserInfo;
const AudioModule = NativeModules.AudioModule;

import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import lodash from 'lodash';

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
BatchedBridge.registerCallableModule(BrowserBridge.name, browserBridge);


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


const ENV_TRANSITION_TIME = 1000;


class TourAppTemplate extends React.Component {
  static defaultProps = {
    tourSource: 'http://localhost:3000/museo/api/json',
  };

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
    /*RCTDeviceEventEmitter.addListener('cambioSala', (arg1) => {
      console.log(arg1);
    });*/
  }

  

  componentDidMount() {
    fetch(this.props.tourSource)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
        //const script = document.createElement("script");
        //script.src = "./menu.js";
        //script.async = true;
        //document.body.appendChild(script);
        BrowserInfo.setLocationId(responseData.firstPhotoId);
      })
      .done();
      this.unsubscribe = browserBridge.subscribe(this.onBrowserEvent);
      /*const doc = new jsPDF();
      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");*/
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

  init(tourConfig) {
    // Initialize the tour based on data file.
    this.setState({
      data: tourConfig,
      locationId: null,
      nextLocationId: tourConfig.firstPhotoId,
      rotation: tourConfig.firstPhotoRotation +
        (tourConfig.photos[tourConfig.firstPhotoId].rotationOffset || 0),
      estado: 'inactivo',
    });
    
  }

  

  render() {
    if (!this.state.data) {
      return null;
    }

    const {useDynamicSurface, mainSurfaceWidth, mainSurfaceHeight} = this.props;
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
      
    
    <View style={{
      width: mainSurfaceWidth,
      height: mainSurfaceHeight,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {tooltips &&
        tooltips.map((tooltip, index) => {
          tooltipActual = tooltip;
          let rotationY = tooltip.rotationY + rotation;
          rotationY = (rotationY + 360) % 360; 
          const showOnLeft = !useDynamicSurface && rotationY > 180 && rotationY < 210;
          // Iterate through items related to this location, creating either
          // info buttons, which show tooltip on hover, or nav buttons, which
          // change the current location in the tour.
          if (tooltip.type) {
            return (
              // Rotate the hotspot surface to the right hotspot position
              // We centered the view so the hotspot icon is on the right position
              <Hotspot
                key={index}
                useDynamicSurface={useDynamicSurface}
                mainSurfaceWidth={mainSurfaceWidth}
                rotationY={rotationY}>
                <TourInfoButton
                  onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                  showOnLeft={showOnLeft}
                  source={asset(data.info_icon)}
                  tooltip={tooltip}
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
              rotationY={rotationY}>
              <TourNavButton
                isLoading={isLoading}
                onClickSound={asset(soundEffects.navButton.onClick.uri)}
                onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                onInput={() => {
                  this.setState({
                  nextLocationId: tooltip.linkedPhotoId,
                  });
                }}
                showOnLeft={showOnLeft}
                source={asset(data.nav_icon)}
                textLabel={tooltip.text}
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
//console.log(value);


AppRegistry.registerComponent('TourAppTemplate', () => TourAppTemplate);

