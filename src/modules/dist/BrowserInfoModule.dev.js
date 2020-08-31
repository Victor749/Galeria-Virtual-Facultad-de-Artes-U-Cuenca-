"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react360Web = require("react-360-web");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//import type {ReactNativeContext} from '../ReactNativeContext';

/**
 * Demonstration of a custom Native Module, used to send browser information
 * to the React application.
*/
var link = 'http://localhost:3000/';
var idSalaG;
var ambient;

function clean(id) {
  element = document.getElementById(id);

  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

$("#btnSonido").click(function () {
  estadoAnt = document.getElementById('btnSonido').getAttribute('estado');
  imgS = document.getElementById('imgSonido');

  if (estadoAnt === 'activo') {
    document.getElementById('btnSonido').setAttribute('estado', 'inactivo');
    imgS.setAttribute('src', 'http://localhost:3000/static_assets/inactiveA.png');
  } else {
    document.getElementById('btnSonido').setAttribute('estado', 'activo');
    imgS.setAttribute('src', 'http://localhost:3000/static_assets/activeA.png');
  }

  window.dispatchEvent(new Event('cambioAudio'));
});
$("#btn_sala").click(function () {
  idSalaG = document.getElementById('changeSala').value;
  window.dispatchEvent(new Event('cambioSala'));
});

var BrowserInfoModule =
/*#__PURE__*/
function (_Module) {
  _inherits(BrowserInfoModule, _Module);

  // _rnctx: ReactNativeContext;
  function BrowserInfoModule(ctx) {
    var _this;

    _classCallCheck(this, BrowserInfoModule);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BrowserInfoModule).call(this, 'BrowserInfo'));
    _this._rnctx = ctx;
    _this._bridgeName = 'BrowserBridge';
    window.addEventListener('cambioSala', function (e) {
      if (!_this._rnctx) {
        return;
      }

      _this._rnctx.callFunction(_this._bridgeName, 'notifyEvent', ['cambioSala', idSalaG]);
    });
    window.addEventListener('cambioAudio', function (e) {
      if (!_this._rnctx) {
        return;
      } //dato = ambient+";" + document.getElementById('btnSonido').getAttribute('estado');


      _this._rnctx.callFunction(_this._bridgeName, 'notifyEvent', ['cambioAudio;' + document.getElementById('btnSonido').getAttribute('estado'), ambient]);
    });
    return _this;
  }
  /**
   * Example of a method that doesn't require a response.
   * Calling this method will set the window title to a specific string,
   * behavior that is not available in the Web Worker.
   */


  _createClass(BrowserInfoModule, [{
    key: "getSala",
    value: function getSala(id) {
      console.log(id, 'get');

      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [id]);
    }
  }, {
    key: "setAmbient",
    value: function setAmbient(ambiente) {
      ambient = ambiente;
    }
  }, {
    key: "setLocationId",
    value: function setLocationId(id_coming) {
      //aqui  hago consulta con id_sala envio datos
      console.log(id_coming.split('-')[1]);
      id = 1;

      if (id_coming.split('-').length > 0) {
        id = id_coming.split('-')[1];
      } else {
        id = id_coming;
      }

      console.log('id_coming', id);
      clean('curadores');
      clean('expositores');
      clean('temaC');
      listaE = [];
      listaC = [];
      temaC = '';
      var ajaxRequest = new XMLHttpRequest();
      ajaxRequest.open("GET", link + "salas/api/curatorial/" + id, false);

      ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
          info = JSON.parse(ajaxRequest.responseText);
          console.log('data to show', info);

          if (!(typeof info.temaCuratorial === 'undefined')) {
            temaC = info.temaCuratorial;
            cod = '<h6><a class="dropdown-item" href="#">' + temaC + '</a></h6>';
            $('#temaC').append(cod);
          }

          listaE = info.expositores;
          listaC = info.curadores;
          listaEaux = [];
          listaCaux = [];

          if (!(typeof listaC === 'undefined')) {
            for (var i = 0; i < listaC.length; i++) {
              if (!listaCaux.includes(listaC[i])) {
                cod = '<h6><a class="dropdown-item" href="#">' + listaC[i] + ' - ' + id + '</a></h6>';
                $('#curadores').append(cod);
                listaCaux.push(listaC[i]);
              }
            }
          }

          if (!(typeof listaE === 'undefined')) {
            for (var i = 0; i < listaE.length; i++) {
              if (!listaEaux.includes(listaE[i])) {
                cod = '<h6><a class="dropdown-item" href="#">' + listaE[i] + ' - ' + id + '</a></h6>';
                $('#expositores').append(cod);
                listaEaux.push(listaE[i]);
              }
            }
          }
        }
      };

      ajaxRequest.send(null);
    }
  }, {
    key: "getEstadoActual",
    value: function getEstadoActual() {
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

  }]);

  return BrowserInfoModule;
}(_react360Web.Module);

exports["default"] = BrowserInfoModule;