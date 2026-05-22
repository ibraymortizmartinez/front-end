// Archivo Orquestador de Módulos (Requisito f)
import { API } from './API.js';
import { UI } from './UI.js';

const api = new API();
const ui = new UI();
let bootstrapModal;
const formulario = document.getElementById('formContacto');

document.addEventListener('DOMContentLoaded', () => {
    // Vincular la Modal nativa de Bootstrap (Requisito e)
    bootstrapModal = new bootstrap.Modal(document.getElementById('modalContacto'));
    
    // Consulta inicial al servidor para cargar la tabla agrupada
    cargarRegistros();

    // 🎯 ESCUCHADOR PARA EL BOTÓN DE AGREGAR REGISTRO 
    // Al hacer clic, limpia todo y abre la modal vacía
    document.getElementById('btnAbrirAgregar').addEventListener('click', () => {
        formulario.reset();                             // Borra lo que haya escrito en las cajas de texto
        document.getElementById('idContacto').value = ''; // Asegura que el ID oculto quede vacío (modo inserción)
        document.getElementById('modalTitulo').textContent = 'Agregar Registro'; // Cambia el título dinámicamente
        bootstrapModal.show();                          // Muestra la ventana modal en pantalla
    });

    formulario.addEventListener('submit', procesarFormulario);
    document.getElementById('tablaContactos').addEventListener('click', evaluarClickTabla);
});

// Agrupa los duplicados de la base de datos antes de mandarlos a pintar a la UI
async function cargarRegistros() {
    const listaCruda = await api.obtenerContactos();
    const contactosAgrupados = {};

    listaCruda.forEach(item => {
        const id = item.id_contacto;
        if (!contactosAgrupados[id]) {
            contactosAgrupados[id] = {
                id_contacto: id,
                nombre: item.nombre,
                apellido: item.apellido,
                nombre_categoria: item.nombre_categoria,
                telefonos: [],
                correos: [],
                valores_originales: [] 
            };
        }

        if (item.tipo_dato === 'Teléfono' && item.valor) {
            contactosAgrupados[id].telefonos.push(item.valor);
        } else if (item.tipo_dato === 'Correo' && item.valor) {
            contactosAgrupados[id].correos.push(item.valor);
        }

        contactosAgrupados[id].valores_originales.push({
            tipo_dato: item.tipo_dato,
            valor: item.valor
        });
    });

    const listaLimpia = Object.values(contactosAgrupados).map(contacto => {
        return {
            id_contacto: contacto.id_contacto,
            nombre: contacto.nombre,
            apellido: contacto.apellido,
            nombre_categoria: contacto.nombre_categoria,
            tipo_dato: contacto.telefonos.length > 0 && contacto.correos.length > 0 ? 'Tel / Correo' : (contacto.telefonos.length > 0 ? 'Teléfono' : 'Correo'),
            valor: [ ...contacto.telefonos, ...contacto.correos ].join(', '),
            valores_originales: contacto.valores_originales
        };
    });

    ui.mostrarContactos(listaLimpia);
}

// Procesa el guardado tanto para inserción nueva como para edición
async function procesarFormulario(e) {
    e.preventDefault();
    
    const id = document.getElementById('idContacto').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        id_categoria: parseInt(document.getElementById('idCategoria').value),
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value
    };

    if (id) {
        // Si hay un ID en el campo oculto, significa que estamos editando
        datos.id_contacto = parseInt(id);
        await api.actualizarContacto(datos);
        ui.notificar("Contacto actualizado con éxito.");
    } else {
        // Si el campo ID está vacío, significa que es un nuevo registro
        await api.agregarContacto(datos);
        ui.notificar("Contacto guardado con éxito.");
    }

    bootstrapModal.hide(); // Cierra la ventana modal automáticamente
    cargarRegistros();     // Recarga los datos de la tabla inmediatamente
}

// Controla las acciones de Editar y Eliminar dentro de la tabla
async function evaluarClickTabla(e) {
    // Lógica para botón Eliminar
    if (e.target.closest('.btn-eliminar')) {
        const boton = e.target.closest('.btn-eliminar');
        const id = boton.dataset.id;
        
        if (confirm(`¿Deseas eliminar permanentemente el contacto #${id}?`)) {
            await api.eliminarContacto(id);
            ui.notificar("Contacto removido de la agenda.");
            cargarRegistros();
        }
    }

    // Lógica para botón Editar (Carga los datos existentes en la modal)
    if (e.target.closest('.btn-editar')) {
        const boton = e.target.closest('.btn-editar');
        const objetoContacto = JSON.parse(boton.dataset.info);

        formulario.reset(); 

        document.getElementById('idContacto').value = objetoContacto.id_contacto;
        document.getElementById('nombre').value = objetoContacto.nombre;
        document.getElementById('apellido').value = objetoContacto.apellido;
        
        const selectCat = document.getElementById('idCategoria');
        for (let i = 0; i < selectCat.options.length; i++) {
            if (selectCat.options[i].text.toLowerCase() === objetoContacto.nombre_categoria.toLowerCase()) {
                selectCat.selectedIndex = i;
                break;
            }
        }

        if (objetoContacto.valores_originales) {
            objetoContacto.valores_originales.forEach(det => {
                if (det.tipo_dato === 'Teléfono') {
                    document.getElementById('telefono').value = det.valor;
                } else if (det.tipo_dato === 'Correo') {
                    document.getElementById('correo').value = det.valor;
                }
            });
        }
        
        document.getElementById('modalTitulo').textContent = 'Actualizar Registro';
        bootstrapModal.show(); // Abre la modal con los datos listos para modificar
    }
}