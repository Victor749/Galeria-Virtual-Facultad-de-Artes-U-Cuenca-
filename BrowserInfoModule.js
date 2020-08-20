
import {Module} from 'react-360-web';


/**
 * Demonstration of a custom Native Module, used to send browser information
 * to the React application.
*/


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





export default class BrowserInfoModule extends Module {
  constructor(ctx) {
    super('BrowserInfo');
    this._rnctx = ctx;
    //this.userAgent = navigator.userAgent;
  }

  /**
   * Example of a method that doesn't require a response.
   * Calling this method will set the window title to a specific string,
   * behavior that is not available in the Web Worker.
   */
  

  


    setLocationId(id) {
        //aqui  hago consulta con id_sala envio datos
        clean('curadores');
        clean('expositores');
        clean('temaC');
        listaE = ['Expositor1', 'Expositor2', 'Expositor3' ];
        listaC = ['Curador1', 'Curador2', 'Curador3' ];
        temaC = "temaC - "+id;
        cod = '<h6><a class="dropdown-item" href="#">'+temaC+'</a></h6>';
            $('#temaC').append(cod);
        for ( var i = 0; i<listaC.length; i++){
            cod = '<h6><a class="dropdown-item" href="#">'+listaC[i]+' - '+id+'</a></h6>';
            $('#curadores').append(cod);
            }
        for ( var i = 0; i<listaE.length; i++){
            cod = '<h6><a class="dropdown-item" href="#">'+listaE[i]+' - '+id+'</a></h6>';
            $('#expositores').append(cod);
        }
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
