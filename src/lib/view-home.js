export function home() {
    return `
    <!------------ Menú de navegación ----------->
    <div class="container-dos">
        <header>

            <div class="title">
                <h1>TIPS TECH</h1>
            </div>

            <input type="checkbox" id="btn-menu">
            <label for="btn-menu"><i class="icono fas fa-bars"></i></label>

            <nav class="menu">
                <ul>
                    <li><a href="#" id="inicio">Inicio</a></li>
                    <li><a href="#" id="computacion">Computación</a></li>
                    <li><a href="#" id="videojuegos">Videojuegos</a></li>
                    <li><a href="#" id="celulares">Celulares</a></li>
                    <li><a href="#" id="accesorios">Accesorios</a></li>
                    <li id="btn-cerrar"><a href="">Cerrar sesión</a></li>
                </ul>
            </nav>

        </header>

    <!------------ Post estático ----------->
        <div>
            <textarea class="post" id="post-area" cols="50" rows="8"></textarea>
            <div class="btns-container">
                <select name="select" id="categoria" class="select-cat">
                    <option value="">Elige categoría a publicar:</option> 
                    <option value="computacion">Computación</option>
                    <option value="videojuegos">Videojuegos</option>
                    <option value="celulares">Celulares</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                    <button id="btn-publicar" class="btns">publicar</button>
            </div>
        </div>

        <div  id="posteos">
        </div>
    </div>
    <!------------ Footer ----------->
	    <footer>
	        <p>
		    Copyright 2020 Diseño y desarrollo por Camila Osores.
	        </p>
	    </footer>
    `


}