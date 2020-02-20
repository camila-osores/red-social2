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

            //Botón publicar post
            document.getElementById('btn-publicar').addEventListener("click", publicar)
            console.log("funciona boton publicar");

            //Función leer datos
            leer_datos();

            //Botón cerrar sesión
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
            console.log("Cerrar sesión")
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

// Inicializando Firestore
let db = firebase.firestore();

//Agregar datos a colección de firestore
function publicar() {
    let post = document.getElementById('post-area').value;
    let cat = document.getElementById('categoria').value;
    if (post) {
        db.collection("post").add({
                posteo: post,
                categoria: cat
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('post-area').value = ' ';
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }
}

//Leer datos
function leer_datos() {
    let post2 = document.getElementById('posteos');
    db.collection("post").onSnapshot((querySnapshot) => {
        post2.innerHTML = " ";

        querySnapshot.forEach((doc) => {
            // console.log(doc);
            post2.innerHTML += `
            <!------------ Post dinámico ----------->
        <div>
            <textarea class="post" id="post-area2" cols="50" rows="8">${doc.data().posteo} </textarea>
            <div class="btns-container">
                <button id="btn-megusta" class="btns">Me gusta</button>
                <button id="btn-editar-${doc.id}" class="btns" value =${doc.id}>Editar</button>
                <button id="btn-eliminar-${doc.id}" class="btns" value =${doc.id}>Eliminar</button>
            </div>
        </div>
        `
                //Reconoce botón eliminar
            window.addEventListener("click", botones)

            function botones(e) {

                let id = `${doc.id}`;

                if (e.target.type === "submit" && e.target.textContent === "Eliminar" && e.target.id === `btn-eliminar-${doc.id}`) {

                    //Borrar post
                    function eliminar(id) {

                        db.collection("post").doc(id).delete().then(function() {
                            console.log("El post se ha eliminado con éxito!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                    eliminar(id);
                }
            }




            //Reconocer botón editar
            window.addEventListener("click", botones2)
            console.log("funciona boton editar")

            function botones2(e) {
                // let id = `${doc.id}`;

                if (e.target.type === "submit" && e.target.textContent === "Editar" && e.target.id === `btn-editar-${doc.id}`) {


                    //Editar post
                    function editar(id) {

                        document.getElementById('posteos').value = id;
                        console.log(posteos)
                        let guardar = document.getElementById(`btn-editar-${doc.id}`);
                        console.log(guardar)
                        guardar.innerHTML = 'Guardar';
                        console.log(guardar)

                        document.getElementById(`btn-editar-${doc.id}`).addEventListener("click", () => {

                            let id = document.getElementById('posteos').value;
                            console.log(id)

                            let publicacion = db.collection("post").doc(id);
                            console.log(publicacion)

                            return publicacion.update({
                                    posteo: post,
                                    categoria: cat
                                })
                                .then(function() {
                                    guardar.innerHTML = 'Editar';
                                    console.log("El post se ha actualizado con éxito!");
                                })
                                .catch(function(error) {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });
                        })

                    }
                    editar();


                }
            }


        });
    });

}