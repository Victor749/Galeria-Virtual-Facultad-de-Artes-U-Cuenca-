// import React from 'react';
// import GoogleLogin from 'react-google-login';

// class ButtonComentario extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             user: null
//         }
//     }

//     responseGoogle = (response) => {
//         console.log(response);
//     }

//     render(){

//         const { user } = props;

//         if(user){
//             return(
//                 <div>
//                     <GoogleLogin 
//                         clientId="508199415466-5e07ejrh57icopd3suqql40og32ej56m.apps.googleusercontent.com"
//                         buttonText="Ingresa para enviar tu comentario"
//                         onSuccess={responseGoogle}
//                         onFailure={responseGoogle}
//                         cookiePolicy={'single_host_origin'}
//                     />                
//                 </div>
//             );
//         }else{
//             <div>
//                 Hello          
//             </div>
//         }


//     }

// }

// export default ButtonComentario;