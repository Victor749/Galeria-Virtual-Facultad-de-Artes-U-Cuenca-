

//import Cookies from 'universal-cookie';

var idActual;
var listaC = [];
var listaE = [];

$(document).ready(function() {
    //document.cookie = "actual=0";
    $('.dropdown-menu').on("click.bs.dropdown", function (e) {
        e.stopPropagation();              
    });
    console.log();
    element = document.getElementsByTagName('div')[8]
    element.style.width = 40;
    element.style.height = 40;
    //window.value.addEventListener("change", getInfoEspecifica, false);
    //console.log(valor);
    getSalas();
    
});

function getSalas(){
    $('#sala').hide();
    for (var i=0;i<5;i++){
        cod = '<h6><a class="dropdown-item" href="#" onclick="goSala('+i+')">Sala'+i+'</a></h6>';
        $('#sala').append(cod);
    }
    //const cookies = new Cookies();
  //cookies = cookie.getCookies();
  //cookies.set('actual', actual, { path: '/' });
  //console.log(cookies.get('actual'));
}

function salas(){
    if($("#sala"). is(":hidden")){
        $('#sala').show();
    }else{
        $('#sala').hide();
    }
}

function setData(){
    console.log('here');
}

function getInfoEspecifica(){
    console.log(window.value);
    cod = '<h6><a class="dropdown-item" href="#" onclick="goSala('+window.value+')">Sala'+window.value+'</a></h6>';
     $('#sala').append(cod);
    //idActual = document.cookie;
    //console.log(idActual);
    //consulta con el id
    //getCuradores();
    //getExpositores();
}

function getExpositores(){
    for ( var i = 0; i<listaE.length; i++){
        cod = '<h6><a class="dropdown-item" href="#">'+listaE[i]+'</a></h6>';
        $('#expositores').append(cod);
    }
    
}

function getCuradores(){
    for ( var i = 0; i<listaC.length; i++){
        cod = '<h6><a class="dropdown-item" href="#">'+listaC[i]+'</a></h6>';
        $('#curadores').append(cod);
    }
    
}


