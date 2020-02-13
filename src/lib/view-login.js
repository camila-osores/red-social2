// aqui exportaras las funciones que necesites (ex index.js)

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };

export function ingreso() {
    return `
      <div class="container">
      <div class="login">
        <h1>Ingresa a TipsTech</h1>
        <input id="email2" class="datos" type="email" placeholder="Correo electrónico">
        <input id="pass2" class="datos" type="password" placeholder="********">
        <button id="ingresar" class="btn1">Ingresar</button>
        <button class="btn2">Google</button>
        <a href="#" id="aqui" class="cuenta"><p>Crea tu cuenta aquí</p></a>
      </div>
      </div>`
}