
import {Module} from 'react-360-web';
//import type {ReactNativeContext} from '../ReactNativeContext';

/**
 * Demonstration of a custom Native Module, used to send browser information
 * to the React application.
*/

var link = 'http://localhost:3000/museo/api/';
var idSalaG;
function clean(id){
    element = document.getElementById(id);
    while(element.hasChildNodes()){
        element.removeChild(element.firstChild);
        //console.log('e');
    }
}

$( "#btnSonido" ).click(function() {
    estadoAnt = document.getElementById('btnSonido').getAttribute('estado');
    imgS = document.getElementById('imgSonido');
    if(estadoAnt === 'activo'){
        document.getElementById('btnSonido').setAttribute('estado', 'inactivo');
        imgS.setAttribute('src', './static_assets/inactiveA.png')
    }else{
        document.getElementById('btnSonido').setAttribute('estado', 'activo');
        imgS.setAttribute('src', './static_assets/activeA.png')
    }
    
});

$("#btn_sala").click(function() {
    //console.log('nuevo', document.getElementById('changeSala').value);
    idSalaG = document.getElementById('changeSala').value;
    //getSala(nuevoId);

    window.dispatchEvent(new Event('cambioSala'));
    //goSala2(nuevoId);
});







export default class BrowserInfoModule extends Module {
   // _rnctx: ReactNativeContext;
  constructor(ctx) {
    super('BrowserInfo');
    this._rnctx = ctx;
    this._bridgeName = 'BrowserBridge';
    //this.userAgent = navigator.userAgent;
    window.addEventListener('cambioSala', e => {
        //console.log(idSalaG);
       //console.log('hey');
        if (!this._rnctx) {
            return;
        }
        //console.log('hey 2');
        this._rnctx.callFunction(this._bridgeName, 'notifyEvent', [idSalaG]);
    });
  }

  /**
   * Example of a method that doesn't require a response.
   * Calling this method will set the window title to a specific string,
   * behavior that is not available in the Web Worker.
   */
  

  getSala(id){
      console.log(id, 'get');
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        id,
    ]);
  }


    setLocationId(id) {
        //aqui  hago consulta con id_sala envio datos
        clean('curadores');
        clean('expositores');
        clean('temaC');
        listaE = [];
        listaC = [];
        temaC = '';
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open("GET", link+"curatorial/"+id, true);
        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                listaSalas = JSON.parse(ajaxRequest.responseText);
                for (var i=0;i<listaSalas.length;i++){
                    sala = listaSalas[i];
                    temaC = sala.temaCuratorial;
                    listaE = sala.expositores;
                    listaC = sala.curadores;
                    listaEaux = [];
                    listaCaux = [];
                    cod = '<h6><a class="dropdown-item" href="#">'+temaC+'</a></h6>';
                        $('#temaC').append(cod);
                    for ( var i = 0; i<listaC.length; i++){
                        if(!listaCaux.includes(listaC[i])){
                            cod = '<h6><a class="dropdown-item" href="#">'+listaC[i]+' - '+id+'</a></h6>';
                            $('#curadores').append(cod);
                            listaCaux.push(listaC[i]);
                        }
                        
                        }
                    for ( var i = 0; i<listaE.length; i++){
                        if(!listaEaux.includes(listaE[i])){
                            cod = '<h6><a class="dropdown-item" href="#">'+listaE[i]+' - '+id+'</a></h6>';
                            $('#expositores').append(cod);
                            listaEaux.push(listaE[i]);
                        }
                    }
                }
            }
        }
        ajaxRequest.send(null);
        
    }

    getEstadoActual(){
        element = document.getElementById('btnSonido').getAttribute('estado');
        //console.log(element);
        return element;
    }

  /**
   * Example of a method that sends back a repsonse via a callback.
   * React calls this method with a callback, ie:
   *
   *   BrowserInfoModule.getBatteryLevel(level => {
   *     // ... do something with battery level
   *   });
   *
   * Once data is available, it is passed by React by invoking the original
   * callback method, which will be executed with the provided arguments.
   */
  

  
}
