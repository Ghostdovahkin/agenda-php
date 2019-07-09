const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');    

eventListeners();
function eventListeners() {
    //cuando el formulario de crear o editar se ejecuta
    if(formularioContactos){
    formularioContactos.addEventListener('submit', leerFormulario);
    }
    //listener para eliminar el boton
    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminarContacto);
    }
    
}
function leerFormulario(e) {
    e.preventDefault();
    const   nombre = document.querySelector('#nombre').value,
            empresa = document.querySelector('#empresa').value, 
            telefono = document.querySelector('#telefono').value,
            accion = document.querySelector('#accion').value;
  if(nombre === '' || empresa === '' || telefono === '') {
    //parametros texto y clase

    mostrarNotificacion('Todos los campos son obligatorios', 'error');
    
  } else {
      const infoContacto = new FormData();
      infoContacto.append('nombre', nombre);
      infoContacto.append('empresa', empresa);
      infoContacto.append('telefono', telefono);
      infoContacto.append('accion', accion);

      console.log(...infoContacto);

      if(accion === 'crear'){
          //crear nuevo elemento
        insertarDB(infoContacto);
      } else {
           // editar  contacto
       const idRegistro = document.querySelector('#id').value;
        infoContacto.append('id', idRegistro);
        actualizarRegistro(infoContacto);  

       }


  }
}
/**inserta en la Db via ajax */
function insertarDB(datos){
    //llamado a ajax

    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','inc/modelos/modelos-contactos.php', true );
    //pasar los datos
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta php
            const respuesta = JSON.parse(xhr.responseText);
            
            //inserta un nuevo contacto en la tabla
            const nuevoContacto = document.createElement('tr');
             
             nuevoContacto.innerHTML = `
             <td>${respuesta.datos.nombre}</td>
             <td>${respuesta.datos.empresa}</td>
             <td>${respuesta.datos.telefono}</td>
            `;
            //contenedor para botones
            const contenedorAcciones = document.createElement('td');

            //crear el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //crear el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn' , 'btn-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear icono eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');
           
            //crear boton eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);
            //agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);

            //resetear el formulario
            document.querySelector('form').reset();
            //mostrar notificacion
            mostrarNotificacion('contacto creado correctamente' , 'correcto');

        }
    }
    //enviar los datos
    xhr.send(datos);
}
function actualizarRegistro(datos) {
    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php', true);
    // leer la respuesta
    xhr.onload = function(){
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            if(respuesta.respuesta === 'correcto'){
                //mostrar notificacion de correcto
                mostrarNotificacion('contacto editado correctamente', 'correcto');
            } else {
                //hubo un error
                mostrarNotificacion('hubo un error', 'error');

            }
        }
    }
    //enviar la peticion
    xhr.send(datos);
}

//eliminar contacto
function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        //tomar id
        const id = e.target.parentElement.getAttribute('data-id');
        //console.log (id);
        //preguntar al usuario
        const respuesta = confirm ('Estas seguro(a) ?');

        if (respuesta) {
            //llamado a ajax
            //crear objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
        xhr.open('GET',`inc/modelos/modelos-contactos.php?id=${id}&accion=borrar`, true);
        //leer la respuesta
        xhr.onload = function (){
            if(this.status === 200 ){
                const resultado = JSON.parse(xhr.responseText);
               if(resultado.respuesta === 'correcto'){
                   //eliminar registro del dom
                console.log(e.target.parentElement.parentElement.parentElement);
                e.target.parentElement.parentElement.parentElement.remove();
                   //mostrar notificacion
                   mostrarNotificacion('contacto eliminado', 'correcto');
               }else{
                   //mostramos una notificacion
                   mostrarNotificacion('hubo un error...', 'error');
               }
            }
        }
        //enviar la peticion
        xhr.send();
        }
    }
}
// notificacion 
function mostrarNotificacion (mensaje , clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;
    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    //ocultar notificacion
   setTimeout(() => {
       notificacion.classList.add('visible');
       setTimeout(() => {
           notificacion.classList.remove('visible');
           setTimeout(() => {
               notificacion.remove();
           }, 500);
       }, 3000);
   }, 100);
}