// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
// myFunction();

// import ingreso,{restar} from './lib/index.js'
    import {ingreso} from './lib/view-login.js';
    import {registro} from './lib/view-registro.js';
    // import {home} from './lib/view-home.js';
    
    //////////////////LOGIN//////////////////////////
    // para mostrar la pantalla login dinámico desde html
    let root = document.getElementById('root')
    root.innerHTML=` ${ingreso()}`

    // se da evento al botón ingresar
    document.getElementById('ingresar').addEventListener("click",() =>{
    console.log("diste click");
    
      // se extraen los datos de los input de login
      let email2=document.getElementById('email2').value;
      let pass2=document.getElementById('pass2').value;
    
      // autentificar al usuario en login
      firebase.auth().signInWithEmailAndPassword(email2,pass2)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, "/No ingresaste tu correo electrónico");
        console.log(errorMessage, "/No ingresaste tu contraseña");
        // ...
      });email2-pass2.html

      //mostrar home al ingresar logueado
        // root.innerHTML=`${home()}`;
    

// Determina si el usuario esta logueado o no dentro de la página
    function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Existe usuario activo");
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log("No existe usuario activo");
        // ...
      }
    });email2-pass2.html
  }
      observador(); 

});


      // se muestra la vista de registro a traves de html dinámico
  document.getElementById('aqui').addEventListener("click", ()=>{
  root.innerHTML= `${registro()}`;
  console.log("funciona boton de linkeado hacia registro");
      
      //////////////////REGISTRO///////////////////////////
      document.getElementById('registrar').addEventListener("click",() =>{
        
      // console.log("funciona click de registro");
      
      let nombre=document.getElementById('nombre').value;
      let apellido=document.getElementById('apellido').value;
      let email1=document.getElementById('email1').value;
      let pass1=document.getElementById('pass1').value;

      // verificación de registro de usuario
      firebase.auth().createUserWithEmailAndPassword(email1,pass1)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, "/No ingresaste tu correo electrónico");
        console.log(errorMessage, "/No ingresaste tu contraseña");
        // ...
      });email1-pass1.html
    });
  });