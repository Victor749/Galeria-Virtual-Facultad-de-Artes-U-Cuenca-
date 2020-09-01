// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Module } from 'react-360-web';
import RCTWorkInProgressSurface from './RCTWorkInProgressSurface'
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalMio } from './src/components/modalMio.component';
import BrowserInfoModule from './src/modules/BrowserInfoModule';

class ModalControl extends React.Component {
  constructor() {
    super();
    this.state = {
      identifier: sessionStorage.getItem('identifier') == 'null' ? null : sessionStorage.getItem('identifier'),
      show2: true,
      obraId: null,
      imageSource: null,
      autor: null,
      titulo: null,
      asignatura: null,
      ciclo: null,
      tutor: null,
      dimensiones: null,
      fechaProducccion: null,
      rutaElemento: null,
      descripcion: null,
      facebook: null, 
      instagram: null,
      visitas: null,
      tecnica: null,
      linkVideoYoutube: null,
      obj_file: null,
      mtl_file: null,
      suma: null
    }

    window.addEventListener("beforeunload", (event) => {
      console.log("ENTRO AL RECARGAR PAGINA");
      sessionStorage.setItem('identifier', this.state.identifier);
      // sessionStorage.setItem('identifier', 'dsada');
      event.returnValue = '';
    });


  }

  handleUser = (identificador) => {
    // console.log('handleUser');

    let http = new XMLHttpRequest();
    http.open('GET', `http://localhost:3000/usuarios/${identificador}/check`, true);

    http.onreadystatechange = () => {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log("\n\nHa hechoo la solicituuuuud: ");
            if(http.responseText == 'true'){
                console.log("\nTRUEEEEEEEEEEEEEEE: ");
                this.setState({identifier: identificador} );
            }else{
                console.log("\nFALSEEEEEEEEEEEEEEEEE: ");
                this.logoutUser();
            }
        }
    }
    http.send();
    
    console.log("Soy Pablo SOlano");
  }

  logoutUser = () => {
    console.log("ENTRO AL RECARGAR PAGINA222");
    this.setState({identifier: null } );
  }

  componentDidMount(){

    let identifier = this.state.identifier;

    
    if(identifier !== 'null'){
      let http = new XMLHttpRequest();
      http.open('GET', `http://localhost:3000/usuarios/${identifier}/check`, true);

      console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      http.onreadystatechange = () => {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log("\n\nHa hechoo la solicituuuuud2: ");
            if(http.responseText == 'true'){
                console.log("\nTRUEEEEEEEEEEEEEEE: ");
                // this.setState({identifier: identifier} );
            }else{
                console.log("\nFALSEEEEEEEEEEEEEEEEE2: ");
                this.logoutUser();
            }
        }
      }
      
      http.send();
    }else{
      console.log('\n\nENTROOOOOOO AL ELSE: ');
      console.log(identifier);
      
    }   
    sessionStorage.clear();
}

  handleChange = () => {
    console.log(this);
    console.log("Soy Pablo SOlano");
    this.setState({ show2: (!this.state.show2) });
  }


  handleShow = (obra, rutaElemento, contador, suma, obj_file, mtl_file) => {
    console.log(this);
    console.log("Soy Pablo SOlano 22222222");
    console.log(contador);
    this.setState(
      {
        show2: true,
        autor: obra.autor,
        titulo: obra.titulo,
        asignatura: obra.asignatura,
        ciclo: obra.ciclo,
        tutor: obra.tutor,
        dimensiones: obra.dimensiones,
        fechaProducccion: obra.fechaProduccion,
        rutaElemento: rutaElemento,
        descripcion: obra.descripcion,
        tecnica: obra.tecnica,
        facebook: obra.facebook,
        instagram: obra.instagram,
        visitas: contador,
        obraId: obra.idObra,
        linkVideoYoutube: obra.linkVideoYoutube,
        obj_file: obj_file,
        mtl_file: mtl_file,
        suma: suma
    }); 
  }

  render(){
    const {...estado} = this.state;
    return(
      <ModalMio handleChange={this.handleChange} {...estado} document={document} window={window} handleUser={this.handleUser} logoutUser={this.logoutUser}/>
      );
  }
}

class MiModulo extends Module {
  constructor() {
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
  doSomething(obra, rutaElemento, contador, obj_file, mtl_file) {
    console.log("Hola");
    let suma = 0;
    if (obra.linkVideoYoutube !== null) {
      suma += 1;
    }
    if (obra.obj !== null) {
      suma += 1;
    }
    x.handleShow(obra, rutaElemento, contador, suma, obj_file, mtl_file);
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
      ctx => new BrowserInfoModule(ctx),
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

window.React360 = { init };
