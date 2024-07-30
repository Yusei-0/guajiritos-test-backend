# Guajiritos Test Backend

Este proyecto es un backend simple utilizando `json-server` y `json-server-auth` para manejar la autenticación y autorización de usuarios.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto.

### Requisitos

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

### Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd guajiritos-test-backend
```

### Instalar Dependencias

```bash
npm install
```

### Datos Iniciales

El archivo db.json contiene los datos iniciales para usuarios y tareas. El usuario administrador por defecto es:

```json
{
  "email": "admin@example.com",
  "password": "password123",
  "name": "Yusei",
  "role": "admin"
}
```

### Ejecutar el Servidor

Para iniciar el servidor, ejecuta:

``` bash
npm start
```

El servidor estará disponible en http://localhost:3000.

### Endpoints

Registro de Usuario. Permite a un usuario registrarse.

POST /register

Content-Type: application/json

```bash
{
  "email": "nuevoUsuario@example.com",
  "password": "password123",
  "name": "Nuevo Usuario",
  "role": "user"
}
```

Inicio de Sesión. Permite a un usuario iniciar sesión y obtener un token JWT.

POST /login

Content-Type: application/json

```bash
{
  "email": "user3@example.com",
  "password": "password123"
}
```

### Acceso a Recursos Protegidos

Usa el token JWT en el encabezado Authorization para acceder a recursos protegidos.

GET /api/tasks

```bash
Authorization: Bearer <TOKEN>
```

### Reglas de Autorización

Las reglas de autorización están definidas en el archivo rules.json:

```json
{
  "users": 640,
  "tasks": 660
}
```

Usuarios (users: 640): Solo los propietarios pueden acceder y modificar sus datos.

Tareas (tasks: 660): Solo los propietarios pueden acceder y modificar sus tareas.

### Archivos del Proyecto

db.json: Contiene los datos iniciales de usuarios y tareas.

rules.json: Define las reglas de autorización para cada colección.

server.js: Configuración del servidor y middlewares.

### Estructura del Proyecto

```bash
guajiritos-test-backend/
├── db.json
├── package.json
├── rules.json
└── index.js
```
