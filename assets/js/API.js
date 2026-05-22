export class API {
    constructor() {
        this.urlBase = "https://ibraymortizmartinez.com/backend-contactos/index.php";
    }

    // GET: Traer contactos completos
    async obtenerContactos() {
        try {
            const respuesta = await fetch(`${this.urlBase}?accion=contactos-completos`, {
                method: 'GET'
            });
            const resultado = await respuesta.json();
            // Tu controlador devuelve { ok: true, mensaje: "...", data: [...] }
            return resultado.data || [];
        } catch (error) {
            console.error("Error al obtener contactos:", error);
            return [];
        }
    }

    // POST: Agregar contacto completo (Tu controlador pide fecha_nacimiento, la mandaremos vacía o por defecto)
    async agregarContacto(datos) {
        try {
            const cuerpoPeticion = {
                nombre: datos.nombre,
                apellido: datos.apellido,
                fecha_nacimiento: "2000-01-01", // Tu controlador lo pide de forma obligatoria en la línea 110
                id_categoria: datos.id_categoria,
                telefono: datos.telefono,
                correo: datos.correo
            };

            const respuesta = await fetch(`${this.urlBase}?accion=agregar-contacto-completo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cuerpoPeticion)
            });
            return await respuesta.json();
        } catch (error) {
            console.error("Error al insertar:", error);
        }
    }

    // PUT: Tu controlador procesa las actualizaciones mediante el caso "actualizar-contacto" en PUT (Línea 141)
    async actualizarContacto(datos) {
        try {
            const cuerpoPeticion = {
                id_contacto: datos.id_contacto,
                nombre: datos.nombre,
                apellido: datos.apellido,
                fecha_nacimiento: "2000-01-01", // Requerido por tu modelo
                id_categoria: datos.id_categoria
            };

            const respuesta = await fetch(`${this.urlBase}?accion=actualizar-contacto`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cuerpoPeticion)
            });
            return await respuesta.json();
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    }

    // DELETE: Tu controlador procesa las eliminaciones mediante el caso "eliminar-contacto" en DELETE (Línea 180)
    async eliminarContacto(id) {
        try {
            const respuesta = await fetch(`${this.urlBase}?accion=eliminar-contacto`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_contacto: parseInt(id) })
            });
            return await respuesta.json();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }
}