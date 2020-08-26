// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
import RCTWorkInProgressSurface from './RCTWorkInProgressSurface'
import React from 'react';
import ReactDOM from 'react-dom';
import {ModalMio} from './src/components/modalMio.component';

class ModalControl extends React.Component{
  constructor() {
    super();
    this.state = {
      show2: true,
      imageSource: null,
      autor :  null,
      titulo :  null,
      asignatura :  null,
      ciclo :  null,
      tutor :  null,
      dimensiones :  null,
      fechaProducccion : null,
      rutaElemento: null,
      descripcion: null
    }
  }

  handleChange = () => {
      console.log(this);
      console.log("Soy Pablo SOlano");
      this.setState({show2: (!this.state.show2)});
  }

  handleShow = (obra, rutaElemento) => {
    console.log(this);
    console.log("Soy Pablo SOlano 22222222");
    this.setState(
      {
      show2: true,
      autor: obra.autor,
      titulo : obra.titulo,
      asignatura : obra.asignatura,
      ciclo : obra.ciclo,
      tutor : obra.tutor,
      dimensiones : obra.dimensiones,
      fechaProducccion : obra.fechaProducccion,
      rutaElemento : rutaElemento,
      descripcion: obra.descripcion
    }); 
}

  render(){
    const {...estado} = this.state;
    return(
      <ModalMio handleChange={this.handleChange} {...estado} />
    );
  }
}

class MiModulo extends Module {
  constructor(){
    super('MiModulo'); // Makes this module available at NativeModules.MyModule
    modal = document.getElementById('modal');
    console.log("\n\nHeyyyyyy que maaaas");
    // this.state = {
    //   show: false
    // }
    // modalControl = new ModalControl();
    // console.log("Hola2");
    // console.log(modalControl);
    x = ReactDOM.render(
      <ModalControl />
      ,
      document.getElementById('modal')
    );

    document.x = x;
    
  }

// This method will be exposed to the React app
  doSomething(obra, rutaElemento){
    console.log("Hola");
    x.handleShow(obra, rutaElemento);
  }
}




function init(bundle, parent, options = {}) {

  // console.log(handleModal);
  // handleModal();
  // handleModal("LAAAAAAAAAAAAAAAAA");
  // initialise instant game
  // if (FBInstant) {
  //   FBInstant.initializeAsync()
  //   .then(function() {
  //     FBInstant.setLoadingProgress(100);
  //     FBInstant.startGameAsync();
  //   });
  // }

  const useDynamicSurface = options.useDynamicSurface;
  let mainSurfaceWidth;
  let mainSurfaceHeight;
  // If use dynamic surface, the main surface renders nothing, so we can make it really small: 1x1
  if (useDynamicSurface) {
    mainSurfaceWidth = 1;
    mainSurfaceHeight = 1;
  } else {
    // If use cylinder surface to layout, we need full circle to put hotspot anywhere.
    mainSurfaceWidth = 4096; // default surface density for circle
    mainSurfaceHeight = 600;
  }

  const mainSurface = new Surface(mainSurfaceWidth, mainSurfaceHeight);
  if (!useDynamicSurface) {
    mainSurface.setDensity(mainSurfaceWidth);
  }

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new MiModulo(),
    ],
    customViews: [
      {
        // Add custom native view "RCTSurface" to support surface control
        name: 'RCTWorkInProgressSurface',
        view: RCTWorkInProgressSurface,
      },
    ],
    ...options,
  });

  RCTWorkInProgressSurface.__reactInstance = r360;

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    // console.log(handleModal);
    r360.createRoot('TourAppTemplate', { 
      /* initial props */
      useDynamicSurface: useDynamicSurface,
      mainSurfaceWidth: mainSurfaceWidth,
      mainSurfaceHeight: mainSurfaceHeight,
      
    })
    ,
    mainSurface, //r360.getDefaultSurface()
  );
}

window.React360 = {init};
