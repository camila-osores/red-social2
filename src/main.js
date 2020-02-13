import { ingreso } from './lib/view-login.js';
import { registro } from './lib/view-registro.js';
import { home } from './lib/view-home.js';

let root = document.getElementById('root')

function iniciar() {
    // se extraen los datos de los input de login
    let email2 = document.getElementById('email2').value;
    let pass2 = document.getElementById('pass2').value;

    // autentificar al usuario en login
    firebase.auth().signInWithEmailAndPassword(email2, pass2)

    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, "/No ingresaste tu correo electrónico");
        console.log(errorMessage, "/No ingresaste tu contraseña");
    });
}

// Determina si el usuario está activo o no
function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            root.innerHTML = `${home()}`;
            var anonymous = user.isAnonymous;
            var uid = user.uid;
            console.log("Existe usuario activo")
            document.getElementById('btn-cerrar').addEventListener("click", cerrar)

        } else {
            root.innerHTML = (ingreso());
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
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}

// se muestra página de registro a través de html dinámico
// console.log(document.getElementById('aqui'))

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
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("No ingresaste tu correo electrónico");
                console.log("No ingresaste tu contraseña");
            });

    });
};