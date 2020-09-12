
var globalBoton;

function editar(idComentario, boton){

    data = boton.parent().parent().parent()[0].children[2].children[0].innerHTML;
    cleanEdicionAntigua();
    globalBoton = boton;
    var codigo = '<div class="modal" id="myModalEditar">' +
        '<div class="modal-dialog p-5" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title">Editar Comentario</h5>' +
        '<button type="button" onclick="cleanEdicionAntigua()" class="close" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row align-items-center justify-content-center mb-5">' +
        '<textarea id="comentarioEditado" cols=50 rows=8>' + data + '</textarea></div>' +
        '<div class="alert alert-dismissible alert-danger" id="errorMensaje">' +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<strong>Comentario vacio. </strong><a href="#" class="alert-link" onclick="eliminar(\''+idComentario+'\')" >Eliminar Comentario</a>' +
        '</div>'+
        '<div class="alert alert-dismissible alert-danger" id="errorMensaje2">' +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<p>Ha ocurrido un error. </p><strong>Intentalo mas tarde.</strong>' +
        '</div>'+
        '<div class="row align-items-center justify-content-center mb-5">'+ 
        '<button class="btn btn-success mr-3" onclick="guardarEdicion(\''+idComentario+'\')">Guardar</button><button class="btn btn-danger" onclick="cleanEdicionAntigua()">Cancelar</button></div></div>'
        ;
    codigo += '<div class="modal-footer">' +
        '<button type="button" onclick="cleanEdicionAntigua()" class="btn btn-secondary" >Cerrar</button>' +
        '</div></div></div></div>';
    $("#forModalEditar").append(codigo);
    $('#errorMensaje').hide();
    $('#errorMensaje2').hide();
    $('#myModalEditar').modal('show');

}

function actualizar(nuevoContenido, fecha){
    globalBoton.parent().parent().parent()[0].children[2].children[0].innerHTML = nuevoContenido;
    globalBoton.parent().parent().parent()[0].children[1].children[0].innerHTML = fecha;
}

function guardarEdicion(idComentario){
    console.log(globalBoton);
    var nuevoC = $("#comentarioEditado").val();
    if(nuevoC == ''){
        $('#errorMensaje').show();
    }else{
        var url = "/comentarios/editComentario";

        var data = {};
        data.idComentario = idComentario;
        comentarioTokens = '';
        for(var i=0;i<nuevoC.length;i++){
            /*if(nuevoC[i] == '\'' ){
                comentarioTokens += '\\'+nuevoC[i];
            }else{
                comentarioTokens +=nuevoC[i];
                
            }*/
            comentarioTokens +=nuevoC[i];

        }
        data.contenido  = comentarioTokens;
        var f = new Date();
        data.fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var comentarioAnswer = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                actualizar(nuevoC,data.fecha);
                cleanEdicionAntigua();
            } else {
                console.error(comentarioAnswer);
                $('#errorMensaje').hide();
                $('#errorMensaje2').show();
            }
        }
        xhr.send(json);
    }
}

function cleanEdicionAntigua() {
    $('#myModalEditar').modal('hide');
    var element = document.getElementById("forModalEditar");
    while (element.firstChild) {
        console.log('over here');
        element.removeChild(element.firstChild);
    }
}

function eliminar(idComentario){
    $('.'+idComentario).remove();
    console.log(idComentario);
    var url = "/comentarios/deleteComentario/"+idComentario;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
           $('.'+idComentario).remove();
           cleanEdicionAntigua();
           window.dispatchEvent(new Event('deleteComentario'));
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}

