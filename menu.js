

var link = 'http://localhost:3000/museo/api/';



$(document).ready(function() {
    $('.dropdown-menu').on("click.bs.dropdown", function (e) {
        e.stopPropagation();              
    });
    console.log();
    element = document.getElementsByTagName('div')[8]
    element.style.width = 40;
    element.style.height = 40;
    getSalas();
    
});

function getSalas(){
    $('#sala').hide();
    $('#temaC').hide();
    $('#expositores').hide();
    $('#curadores').hide();
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", link+"salas", false);
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            listaSalas = JSON.parse(ajaxRequest.responseText);
            for (var i=0;i<listaSalas.length;i++){
                cod = '<h6><a class="dropdown-item" href="#" onclick = "goSala('+listaSalas[i].idSala+')">Sala'+(i+1)+': '+listaSalas[i].temaCuratorial+'</a></h6>';
                $('#sala').append(cod);
            }
        }
    }
    ajaxRequest.send(null);
   /* for (var i=0;i<5;i++){
        cod = '<h6><a class="dropdown-item sala" href="#" onclick="goSala('+i+')">Sala'+i+'</a></h6>';
        $('#sala').append(cod);
    }*/
    //const cookies = new Cookies();
  //cookies = cookie.getCookies();
  //cookies.set('actual', actual, { path: '/' });
  //console.log(cookies.get('actual'));
}

function goSala(id){
    console.log(id);
    document.getElementById('changeSala').value = id; 
    $("#btn_sala").trigger("click");
}

function showData(id){
    if($(id). is(":hidden")){
        $(id).show();
    }else{
        $(id).hide();
    }
}







