import { ingreso } from './lib/view-login.js';
import { registro } from './lib/view-registro.js';
import { home } from './lib/view-home.js';

let root = document.getElementById('root');


function iniciar() {
    // se extraen los datos de los input de login
    let email2 = document.getElementById('email2').value;
    let pass2 = document.getElementById('pass2').value;

    // autentificar al usuario en login
    firebase.auth().signInWithEmailAndPassword(email2, pass2)

    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("No ingresaste tu correo electrónico");
        console.log("No ingresaste tu contraseña");
    });
}

// Iniciar sesión con Google
function inicioGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}


// Determina si el usuario está activo o no
function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            root.innerHTML = `${home()}`;
            var anonymous = user.isAnonymous;
            var uid = user.uid;
            console.log("Existe usuario activo");
            document.getElementById('btn-publicar').addEventListener("click", publicar)
            console.log("funciona boton publicar");
            document.getElementById('btn-cerrar').addEventListener("click", cerrar)

        } else {
            root.innerHTML = (ingreso());
            document.getElementById('google').addEventListener("click", inicioGoogle);
            console.log("hace click boton google")
            let ingresar = document.getElementById("ingresar");
            ingresar.addEventListener("click", iniciar)
            console.log("No existe usuario activo");
            document.getElementById('aqui').addEventListener("click", regis)
        }
    });
}
observador();

// Funcion para cerrar sesión
let cerrar = () => {
    firebase.auth().signOut()
        .then(function() {
            console.log("Has cerrado sesión")
        }).catch(function(error) {});
}

let regis = () => {
    root.innerHTML = registro();
    console.log("funciona boton de linkeado hacia registro");

    //////////////////REGISTRO///////////////////////////
    document.getElementById('registrar').addEventListener("click", () => {
        // console.log("funciona click de registro");

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let email1 = document.getElementById('email1').value;
        let pass1 = document.getElementById('pass1').value;

        // verificación de registro de usuario
        firebase.auth().createUserWithEmailAndPassword(email1, pass1)
            .then(function() {
                verificar()
                cerrar()
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("No ingresaste tu correo electrónico");
                console.log("No ingresaste tu contraseña");
            });



    });
};

// Verificamos a través de correo electrónico si el usuario quedó registrado
function verificar() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification()
        .then(function() {
            console.log("Enviando correo");
        }).catch(function(error) {
            console.log(error);
        });
}

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//Agregar datos a firestore
function publicar() {
    let post = document.getElementById('post-area').value;

    db.collection("post").add({
            posteo: post,
            // last: "Lovelace",
            // born: 1815
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('post-area').value = ' ';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
publicar();