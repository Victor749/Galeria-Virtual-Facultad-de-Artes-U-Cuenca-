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

        let {comment, identifier, obraId, deleteSentComment} = this.props;
        // console.log(comment);

        if(identifier && comment.length){
            params = `identifier=${identifier}&idObra=${obraId}&contenido=${comment}`;

            request = this.makePostRequest('http://localhost:3000/comentarios/new');

            request.onreadystatechange = function() {//Call a function when the state changes.
                if(request.readyState == 4 && request.status == 200) {
                    deleteSentComment();
                }else{
                    alert(request.responseText);
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

                    request = this.makePostRequest('http://localhost:3000/usuarios/new');

                    request.onreadystatechange = function() {//Call a function when the state changes.
                        if(request.readyState == 4 && request.status == 200) {
                            // alert(request.responseText);
                            handleUser(request.responseText);
                        }
                    }
                    request.send(params);              
                }, function(error) {
                alert(JSON.stringify(error, undefined, 2));
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
                            <img className="googleIcon" src="http://localhost:3000/static_assets/google.png"></img>
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
                            <img className="googleIcon " src="http://localhost:3000/static_assets/google.png"></img>
                            <span className="buttonText">Sign In to Send</span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div>
                    <button onClick={() => {this.sendComment()}} className={`${comment.length ? 'enviar' : 'empty'}`}>
                        {/* <img src='http://localhost:3000/static_assets/send.png' className="enviarImg"></img> */}
                        {`Send`}
                    </button>
                    
                </div> 
            );
        }


    }

}

