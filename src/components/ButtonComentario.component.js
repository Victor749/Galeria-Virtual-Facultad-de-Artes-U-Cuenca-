import React from 'react';
// import {NativeModules} from 'react-360';

export class ButtonComentario extends React.Component{

    constructor(props){
        super(props);
        this.valid = null;
    }

    makePostRequest = (url) => {
        let http = new XMLHttpRequest();
        http.open('POST', url, false);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        return http;

    }

    

    sendComment = () => {

        let {comment, identifier, obraId, deleteSentComment} = this.props;
        // console.log(comment);

        comentarioTokens = '';
        for(var i=0;i<comment.length;i++){
            /*if(comment[i] == '\'' ){
                comentarioTokens += '\\'+comment[i];
            }else{
                comentarioTokens +=comment[i];
            }*/
            comentarioTokens +=comment[i];
        }

        if(identifier && comment.length){
            params = `identifier=${identifier}&idObra=${obraId}&contenido=${comentarioTokens}`;
           
            request = this.makePostRequest('/comentarios/new');

            request.onreadystatechange = function() {//Call a function when the state changes.
                if(request.readyState == '4' && request.status == '200') {
                    //console.log(request.responseText);
                    //addNewCommentaryVista();
                    idComentario = JSON.parse(request.responseText).insertId;
                    deleteSentComment();
                 //   console.log('well');
                    var url  = "/comentarios/getNewComentario/"+idComentario;
                    var xhr  = new XMLHttpRequest()
                    xhr.open('GET', url, true)
                    xhr.onload = function () {
                        var data = JSON.parse(xhr.responseText);
                        if (xhr.readyState == 4 && xhr.status == "200") {
                            info = '<tr class="'+data.idComentario+'"><td>'+'<div class="row justify-content-center mb-5" >'+
                                    '<div class="col col-sm-1 col-auto mr-5"><img src="'+data.linkFoto+'" height=60 width=60></div>'+
                                    '<div class="col col-sm-9 col-auto"><div class="row align-items-left ml-2" ><b style="color:black;">'+data.nombreUsuario+'</b></div>'+
                                    '<div class="row align-items-left ml-3 mb-2" ><p class="text-muted">'+data.fecha+'</p></div>'+
                                    '<div class="row align-items-left ml-2 text-justify" ><p>'+data.contenido+'</p></div>'+
                                    '<div class="'+data.identificador+'"><div class="row align-items-right" ><button onclick="editar(\''+data.idComentario+'\', $(this))" class="btn btn-info mr-3">Editar</button><button onclick="eliminar('+data.idComentario+')" class="btn btn-danger">Eliminar</button></div></div>'+
                                    '</div></div></td></tr>';
                                    $('#listaComentarios').append(info);
                            $('#tabla').animate({ scrollTop: $('#tabla').prop("scrollHeight")}, 1000); 
                            //Para probar
                            /*var $body =  $('#tabla');
                            $body.bind('scroll', function() {
                                // "Desactivar" el scroll horizontal
                                if ($body.scrollLeft() !== 0) {
                                    $body.scrollLeft(0);
                                }
                            }); */  
                        } else {
                           // console.error(data);
                           alert("Ha ocurrido un error. Intentelo mas tarde");
                        }
                    }
                    xhr.send(null);
                    
                }else{
                    alert("Ha ocurrido un error. Intentelo mas tarde");
                   // console.log('error', request.responseText);
                }
            }
            request.send(params);
        }
        
    }
    
    attachSignin(element){

        const { handleUser } = this.props;
        
        // console.log(element);
        if(element != null){
            
            auth2.attachClickHandler(element, {}, (googleUser) => {                
                    // console.log(googleUser.getBasicProfile());
                    // console.log(googleUser);
                    let usuario=googleUser.getBasicProfile();
                    // console.log(usuario.aU);
                    params = `idUsuario=${usuario.aU}&nombreUsuario=${usuario.GV}&apellidoUsuario=${usuario.HT}&linkFoto=${usuario.jK}&email=${usuario.bu}`;

                    request = this.makePostRequest('/usuarios/new');

                    request.onreadystatechange = function() {//Call a function when the state changes.
                        if(request.readyState == 4 && request.status == 200) {
                            // alert(request.responseText);
                            handleUser(request.responseText);
                        }
                    }
                    request.send(params);              
                }, function(error) {
               // alert(JSON.stringify(error, undefined, 2));
               alert('No se ha iniciado una sesión: Ha cerrado la ventana de Google o necesita habilitar las cookies para este sitio.');
            });
        }
    }

    addFunctionality = () => {
        gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
              client_id: '508199415466-5e07ejrh57icopd3suqql40og32ej56m.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              // Request scopes in addition to 'profile' and 'email'
              //scope: 'additional_scope'
            });
            this.attachSignin(document.getElementById('customBtnSignIn'));
            this.attachSignin(document.getElementById('customBtnToSend'));
            // console.log("VERSOOOOS");
        });
    }


    componentDidMount(){
        // const { document, window } = this.props;
        // console.log("\n\nUUUUUUUUUUUU222222222222: \n\n");
        
        this.addFunctionality();
        
    }  
    
    componentDidUpdate() {
        // console.log("\n\nUUUUUUUUUUUU33333333333: \n\n");
        this.addFunctionality();
        // console.log("\n\nUUUUUUUUUUUU33333333333: \n\n");
    }


    render(){
        // console.log(MiModulo);
        // user2 = JSON.parse(user);
        // console.log("HEYYYYYYY");
        // console.log(this.valid);

        let { identifier, topButton, signOutUser, comment} = this.props;
        // console.log(identifier);

        if(! identifier && topButton){
            return(
                <div>
                    <div id="gSignInWrapper" className="pr-4">
                        <div id="customBtnSignIn" className="customGPlusSignIn ">
                            <img className="googleIcon" src="/static_assets/google.png"></img>
                            <span className="buttonText">Sign In</span>
                        </div>
                    </div>
                </div>
            );
        }else if(topButton){
            return(
                <div>
                    <button className="signOut pr-4" onClick={signOutUser} >Sign Out</button>
                </div>
            );
        }else if(! identifier ){
            return(
                <div>
                    <div id="gSignInWrapper">
                        <div id="customBtnToSend" className="customGPlusSignIn ">
                            <img className="googleIcon " src="/static_assets/google.png"></img>
                            <span className="buttonText">Sign In to Send</span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div>
                    <button onClick={() => this.sendComment()} className={`${comment.length ? 'enviar' : 'empty'}`}>
                        {/* <img src='http://localhost:3000/static_assets/send.png' className="enviarImg"></img> */}
                        {`Send`}
                    </button>
                    
                </div> 
            );
        }


    }

}

