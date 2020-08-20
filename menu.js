


$(document).ready(function() {
    //document.cookie = "actual=0";
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
    for (var i=0;i<5;i++){
        cod = '<h6><a class="dropdown-item" href="#" onclick="goSala('+i+')">Sala'+i+'</a></h6>';
        $('#sala').append(cod);
    }
    //const cookies = new Cookies();
  //cookies = cookie.getCookies();
  //cookies.set('actual', actual, { path: '/' });
  //console.log(cookies.get('actual'));
}

function showData(id){
    if($(id). is(":hidden")){
        $(id).show();
    }else{
        $(id).hide();
    }
}







