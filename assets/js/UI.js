// Clase OOP para manipulación del DOM e Interfaz Cyberpunk (Punto f)
export class UI {
    constructor() {
        this.tabla = document.getElementById('tablaContactos');
    }

    // Rellenar la tabla dinámicamente con estética Sci-Fi (Punto a, c)
    mostrarContactos(contactos) {
        this.tabla.innerHTML = '';

        if (!contactos || contactos.length === 0) {
            this.tabla.innerHTML = `<tr><td colspan="6" class="text-center text-warning py-4 font-monospace">// SYSTEM_ALERT: No data arrays found in host server.</td></tr>`;
            return;
        }

        contactos.forEach(contacto => {
            const tr = document.createElement('tr');
            
            // Renderización enlazada milimétricamente con el nuevo index.html
            tr.innerHTML = `
                <td class="fw-bold" style="color: #00f0ff; text-shadow: 0 0 5px rgba(0,240,255,0.4);">
                    #${contacto.id_contacto}
                </td>
                <td>
                    <div class="fw-bold text-white">${contacto.nombre}</div>
                    <div class="text-muted small" style="font-size: 0.8rem;">${contacto.apellido}</div>
                </td>
                <td>
                    <span class="badge ${this.obtenerClaseCyberBadge(contacto.nombre_categoria)}" style="font-size: 0.75rem; letter-spacing: 0.5px; border-radius: 4px;">
                        ${contacto.nombre_categoria.toUpperCase()}
                    </span>
                </td>
                <td class="small fw-bold text-white-50">
                    <i class="bi bi-radar me-1 text-info"></i> ${contacto.tipo_dato || 'NULL'}
                </td>
                <td class="font-monospace text-info small">
                    ${contacto.valor || 'NULL'}
                </td>
                <td class="text-end">
                    <div class="d-flex justify-content-end gap-1">
                        <button class="btn btn-sm btn-editar px-2" 
                                data-id="${contacto.id_contacto}" 
                                data-info='${JSON.stringify(contacto)}'
                                style="background: transparent; border: 1px solid #ff9900; color: #ff9900; box-shadow: 0 0 5px rgba(255,153,0,0.2);">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-eliminar px-2" 
                                data-id="${contacto.id_contacto}"
                                style="background: transparent; border: 1px solid #ff007f; color: #ff007f; box-shadow: 0 0 5px rgba(255,0,127,0.2);">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </td>
            `;
            this.tabla.appendChild(tr);
        });
    }

    // Elige un color de neón puro de acuerdo con el tipo de grupo
    obtenerClaseCyberBadge(categoria) {
        switch (categoria.toLowerCase()) {
            case 'familia cercana': 
                return 'bg-dark text-info border border-info';
            case 'trabajo': 
                return 'bg-dark text-success border border-success';
            case 'escuela': 
                return 'bg-dark text-warning border border-warning';
            case 'amigos': 
                return 'bg-dark style="color: #ff007f !important; border: 1px solid #ff007f !important;"';
            case 'clientes': 
                return 'bg-dark style="color: #15f4ee !important; border: 1px solid #15f4ee !important;"';
            default: 
                return 'bg-dark text-secondary border border-secondary';
        }
    }

    // Notificaciones integradas al estilo terminal de alerta
    notificar(mensaje) {
        console.log(`[SYS_LOG]: ${mensaje}`);
        alert(`[AGENDA_NET_RESPONSE]: ${mensaje}`);
    }
}