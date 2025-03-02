
# Mini reproductor - Práctica CRUD

Este proyecto es una práctica para reforzar los conceptos de **CRUD** (Create, Read, Update, Delete) en **JavaScript** utilizando **Programación Orientada a Objetos (POO)**. La aplicación simula un mini reproductor donde se pueden agregar canciones con su título, artista, duración y archivo de audio.

## Tecnologías utilizadas

- **HTML, CSS y JavaScript** para la interfaz y la lógica de la aplicación.
- **JSON Server** para simular una base de datos y manejar las operaciones CRUD.
- **Node.js con Express y Multer** para gestionar la subida de archivos de audio.

## Estado del proyecto

✅ **Implementado:**  
- CRUD funcional para agregar, listar, editar y eliminar canciones.  
- Uso de JSON Server como backend falso.  
- Interfaz simple con formularios para agregar canciones.  

🔜 **Pendiente por implementar:**  
- Permitir subir archivos de audio y guardarlos en una carpeta del servidor.  
- Mejorar la reproducción de audio dentro de la aplicación.  
- Implementar un diseño más atractivo con CSS.  
- Desplegar la aplicación en un servidor real (Render o similar) para que funcione sin necesidad de que el servidor JSON esté encendido localmente.

## Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd mini-spotify
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Levantar el servidor JSON:
   ```bash
   npm run api
   ```

4. Levantar el servidor para subir archivos:
   ```bash
   node server.js
   ```

5. Abrir el archivo `index.html` en el navegador.

## Contribuciones
Este proyecto es una práctica personal, pero cualquier sugerencia o mejora es bienvenida. Puedes hacer un **fork** del repositorio y probar mejoras.

---

📌 **Nota:** Este proyecto es experimental y aún está en desarrollo, por lo que algunas funciones pueden no estar completamente implementadas.

