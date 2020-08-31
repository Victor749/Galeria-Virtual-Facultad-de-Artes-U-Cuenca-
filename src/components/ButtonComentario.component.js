import React from 'react';
// import {NativeModules} from 'react-360';

export class ButtonComentario extends React.Component{

    constructor(props){
        super(props);
        this.valid = null;
    }

    makePostRequest = (url) => {
        let http = new XMLHttpRequest();
        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        return http;

    }

    sendComment = () => {

        let {comment, identifier, obraId} = this.props;
        console.log(comment);

        params = `indentifier=${identifier}&idObra=${obraId}&contenido=${comment}`;

        request = this.makePostRequest('http://localhost:3000/comentarios/new');

        request.onreadystatechange = function() {//Call a function when the state changes.
            if(request.readyState == 4 && request.status == 200) {
                alert(request.responseText);
            }
        }
        request.send(params);
    }
    

    componentDidMount(){

        // const { document, window } = this.props;
        const { handleUser } = this.props;
        makePostRequest = this.makePostRequest;

        function attachSignin(element){
            console.log("UUUUU: ");
            console.log(element.id);
            auth2.attachClickHandler(element, {},
                function(googleUser) {                
                    console.log(googleUser.getBasicProfile());
                    console.log(googleUser);
                    let usuario=googleUser.getBasicProfile();
                    params = `idUsuario=${usuario.aU}&nombreUsuario=${usuario.GV}&apellidoUsuario=${usuario.HT}&linkFoto=${usuario.jK}&email=${usuario.bu}`;

                    request = makePostRequest('http://localhost:3000/usuarios/new');

                    request.onreadystatechange = function() {//Call a function when the state changes.
                        if(request.readyState == 4 && request.status == 200) {
                            alert(request.responseText);
                            handleUser(request.responseText);
                        }
                    }
                    request.send(params);
                                        
                }, function(error) {
                  alert(JSON.stringify(error, undefined, 2));
            });
        }

        
        console.log("TSPPPPPP");
        console.log(document.getElementById('customBtn'));

        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
              client_id: '508199415466-5e07ejrh57icopd3suqql40og32ej56m.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              // Request scopes in addition to 'profile' and 'email'
              //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('customBtn'));
            console.log("VERSOOOOS");
        });
    }    

    render(){
        // console.log(MiModulo);
        // user2 = JSON.parse(user);
        console.log("HEYYYYYYY");
        console.log(this.valid);

        let { identifier } = this.props;

        if(! identifier ){
            return(
                <div>
                    <div id="gSignInWrapper">
                        {/* <span className="label">Signasdasds in with:</span> */}
                        <div id="customBtn" className="customGPlusSignIn">
                            <span className="icon"></span>
                            <span className="buttonText">Sign In to Send</span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div>
                    <button onClick={() => {this.sendComment()}} className="enviar">
                        <img className="userFoto" /*</button>src={`${user2.jK}`}*/ ></img>
                        {/* {`Send as ${user2.Ad}`} */}
                        {`Send as `}
                    </button>
                    
                </div> 
            );
        }


    }

}

