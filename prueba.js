import React from 'react';
//import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
var test;


export function setCurrent(actual) {
  //var myWorker = new Worker("http://localhost:8081/index.html");
  test = actual;
  postMessage(test);
  
  //postMessage(actual+'');
 // self.postMessage(actual);
  //const setCookie = useCookies(['actual']);
  //setCookie('actual', actual, { path: '/' });
  
  //console.log(React);
  //React.render(<input type="text" id="posActual" hidden>{test}</input>, document.getElementById('pos'));
}







