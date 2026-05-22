# AGENDA_NET // Terminal Cyberpunk de Gestión de Contactos Full-Stack

![Data Status](https://img.shields.io/badge/DATA__STATUS-SINCRONIZADO-00f0ff?style=for-the-badge&logo=probot&logoColor=white)
![Main Server](https://img.shields.io/badge/MAIN__SERVER-HOSTINGER__ON-39ff14?style=for-the-badge&logo=hostinger&logoColor=white)
![CORS Shield](https://img.shields.io/badge/CORS__SHIELD-SECURE__BYPASS-ff007f?style=for-the-badge&logo=adguard&logoColor=white)

## 🌌 Descripción General del Proyecto

**AGENDA_NET** (originalmente *Agenda PRO*) es una aplicación web Full-Stack avanzada de administración e indexación de contactos. El proyecto representa la evolución y maduración directa de la **Actividad 4.2**, rediseñando por completo una interfaz CRUD tradicional para convertirla en una **interfaz de terminal oscura con estética Cyberpunk / Sci-Fi** altamente optimizada y responsiva.

El sistema implementa una arquitectura desacoplada donde el Front-end está alojado de forma estática en **GitHub Pages** y se comunica de manera asíncrona mediante peticiones HTTP (Fetch API) con un ecosistema Back-end desarrollado en **PHP** y persistido en una base de datos **MySQL**, desplegado en un entorno de producción real dentro de **Hostinger**.

---

## 🛠️ Arquitectura del Sistema

El desarrollo se concibió bajo el paradigma de separación de responsabilidades, dividiendo el ecosistema en dos capas principales:

### 1. Front-end (Cliente)
Desplegado en el entorno globalizado de **GitHub Pages**. Diseñado utilizando Programación Orientada a Objetos (POO) en JavaScript nativo (Vanilla JS) para el control del DOM, estructurado de la siguiente forma:
* **`index.html`**: Maquetado base estructurado de forma limpia mediante componentes de **Bootstrap 5**, libre de estilos inline masivos, configurando el acceso al diseño y scripts por medio de rutas relativas sólidas.
* **`assets/css/Style.css`**: Hoja de estilos centralizada que inyecta la identidad visual del proyecto. Define variables globales de color (`--neon-cyan`, `--neon-magenta`, etc.), mallas de fondo de terminal y efectos de luminiscencia (*text-shadow* y *box-shadow*).
* **`assets/js/API.js`**: Clase especializada encargada de abstraer las peticiones asíncronas hacia los endpoints del servidor remoto usando `fetch`.
* **`assets/js/UI.js`**: Clase encargada exclusivamente del renderizado dinámico de la interfaz, pintado de tablas con alto contraste, control de badges de categorías y gestión visual de alertas del sistema.
* **`assets/js/app.js`**: Orquestador principal que captura los eventos del DOM e intercomunica las capas de datos (`API.js`) y presentación (`UI.js`).

### 2. Back-end & Persistencia (Servidor)
Alojado bajo un dominio/subdominio propio en **Hostinger Cloud**.
* **Motor API (PHP)**: Concentrado en un controlador centralizado (`index.php`) que intercepta las solicitudes mediante parámetros estructurados de acción (`?accion=contactos-completos`, `?accion=insertar`, etc.).
* **CORS Shield**: Configuración nativa de encabezados HTTP en el servidor para permitir solicitudes seguras cruzadas (*Cross-Origin Resource Sharing*) exclusivamente desde el origen autorizado de GitHub.
* **Base de Datos (MySQL)**: Estructura relacional indexada que almacena la información de contactos, tipos de canales de acceso y vinculación automatizada de categorías de red.

---

## 🎨 Sistema de Diseño Cyberpunk (UI/UX)

La interfaz gráfica fue sometida a un riguroso rediseño estético y de contraste para emular una terminal de red de ciencia ficción, garantizando una legibilidad de nivel de producción bajo las siguientes directrices:

* **Paleta de Colores (Alta Luminiscencia)**:
    * `Fondo Principal`: Azul oscuro abisal (`#050814`) combinado con un patrón cuadriculado (*Grid Network*) sutil.
    * `Neon Cyan` (`#00f0ff`): Utilizado para identificadores críticos (`SYS_ID`), llamadas de atención de tablas y variables de estado activo.
    * `Neon Magenta` (`#ff007f`): Reservado para acciones destructivas del sistema como la eliminación de registros.
    * `Neon Orange` (`#ff9900`): Destinado a interfaces de edición y botones de modificación de datos.
* **Contraste y Legibilidad de Datos**:
    * Los **Nombres** se renderizan en color blanco puro (`#ffffff`) con peso de fuente `700` para impacto inmediato.
    * Los **Apellidos** se configuran mediante un tono blanco traslúcido (`rgba(255, 255, 255, 0.7)`) con peso `500`, resolviendo el problema de invisibilidad en pantallas oscuras sin competir visualmente con el nombre de pila.
    * Los **Badges** de categoría (`FAMILIA CERCANA`, `TRABAJO`, `ESCUELA`, `AMIGOS`) utilizan bordes iluminados personalizados y fondos oscurecidos proporcionales a cada color asignado.

---

## 📂 Estructura de Carpetas del Repositorio

El árbol de archivos mantiene una organización modular estricta de Case-Sensitive (sensible a mayúsculas y minúsculas), previniendo errores de enrutamiento en servidores Linux de producción:

```text
frontend-contactos/
├── index.html                   # Dashboard/Terminal principal de la aplicación
├── assets/                      # Directorio de recursos del sistema
│   ├── css/
│   │   └── Style.css            # Archivo centralizador de estilos neón y fuentes monoespaciadas
│   ├── img/
│   │   ├── grandes-datos.png    
│   |   └── servidor.png         # Iconografía y Favicon personalizado de la aplicación
│   └── js/
│       ├── API.js               # Módulo de consumo asíncrono de endpoints remotos
│       ├── UI.js                # Controlador dinámico del DOM y renderizado de celdas
│       └── app.js               # Enlace de eventos e inicializador del ecosistema
└── index.html                   # Pagina principal