
import {Module} from 'react-360-web';

//import type {ReactNativeContext} from '../ReactNativeContext';

/**
 * Demonstration of a custom Native Module, used to send browser information
 * to the React application.
*/


var idSalaG;
var ambient;

function clean(id){
    element = document.getElementById(id);
    while(element.hasChildNodes()){
        element.removeChild(element.firstChild);
    }
}


$( "#btnSonido" ).click(function() {
    estadoAnt = document.getElementById('btnSonido').getAttribute('estado');
    imgS = document.getElementById('imgSonido');
    if(estadoAnt === 'activo'){
        document.getElementById('btnSonido').setAttribute('estado', 'inactivo');
        imgS.setAttribute('src', '/static_assets/inactiveA.png')
    }else{
        document.getElementById('btnSonido').setAttribute('estado', 'activo');
        imgS.setAttribute('src', '/static_assets/activeA.png')
    }
    window.dispatchEvent(new Event('cambioAudio'));
});

$("#btn_sala").click(function() {
    idSalaG = document.getElementById('changeSala').value;
    window.dispatchEvent(new Event('cambioSala'));

});

export default class BrowserInfoModule extends Module {
   // _rnctx: ReactNativeContext;
  constructor(ctx) {
    super('BrowserInfo');
    this._rnctx = ctx;
    this._bridgeName = 'BrowserBridge';
    window.addEventListener('cambioSala', e => {
        if (!this._rnctx) {
            return;
        }
        this._rnctx.callFunction(this._bridgeName, 'notifyEvent', ['cambioSala', idSalaG]);
    });
    window.addEventListener('cambioAudio', e => {
        if (!this._rnctx) {
            return;
        }
        //dato = ambient+";" + document.getElementById('btnSonido').getAttribute('estado');
        this._rnctx.callFunction(this._bridgeName, 'notifyEvent', ['cambioAudio;'+document.getElementById('btnSonido').getAttribute('estado'), ambient]);
    });
  }

  /**
   * Example of a method that doesn't require a response.
   * Calling this method will set the window title to a specific string,
   * behavior that is not available in the Web Worker.
   */
  

    getSala(id){
        //console.log(id, 'get');
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
            id,
        ]);
    }

    setAmbient(ambiente){
        ambient = ambiente;
    }

    setLocationId(id_coming) {
        //aqui  hago consulta con id_sala envio datos
        //console.log(id_coming.split('-')[1]);
        id = 1;
        if(id_coming.split('-').length > 0 ){
            id = id_coming.split('-')[1];
        }else{
            id=id_coming;
        }
       // console.log('id_coming', id);
        clean('curadores');
        clean('expositores');
        clean('temaC');
        listaE = [];
        listaC = [];
        temaC = '';
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open("GET", "/salas/api/curatorial/"+id, false);
        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                info = JSON.parse(ajaxRequest.responseText);
                //console.log('data to show', info);
                if(!(typeof info.temaCuratorial === 'undefined')){
                    temaC = info.temaCuratorial;
                    cod = '<h6><a class="dropdown-item" href="#">'+temaC+'</a></h6>';
                    $('#temaC').append(cod);
                }
                
                listaE = info.expositores;
                listaC = info.curadores;
                listaEaux = [];
                listaCaux = [];
                if(!(typeof listaC === 'undefined')){
                    for ( var i = 0; i<listaC.length; i++){
                        if(!listaCaux.includes(listaC[i]) && (listaC[i] != 'null')){
                            cod = '<h6><a class="dropdown-item" href="#">'+listaC[i]+'</a></h6>';
                            $('#curadores').append(cod);
                            listaCaux.push(listaC[i]);
                        }
                        
                    }
                }
                if(!( typeof listaE === 'undefined')){
                    for ( var i = 0; i<listaE.length; i++){
                        if(!listaEaux.includes(listaE[i]) && (listaE[i] != 'null')){
                            cod = '<h6><a class="dropdown-item" href="#">'+listaE[i]+'</a></h6>';
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
