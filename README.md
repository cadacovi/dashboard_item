# Dashboard Items - Backend y Frontend

Este proyecto es una aplicacion fullstack que permite gestionar items personales asociados a un usuario. Incluye autenticacion con JWT, backend en Node.js con Express y MongoDB, y frontend en React con TypeScript.

## Descripcion

Dashboard Items es una plataforma donde los usuarios pueden registrarse, iniciar sesion y gestionar una lista de items (tareas, notas, etc). Cada usuario solo puede ver y modificar sus propios items. El backend expone una API REST protegida con JWT y el frontend consume esa API para mostrar la informacion y permitir la gestion de los items.

## Instalacion y ejecucion

### Requisitos
- Node.js 16 o superior
- MongoDB local o cuenta en MongoDB Atlas

### 1. Configurar el backend

    cd backend
    npm install

Copia el archivo .env.example a .env y edita las variables si es necesario:

    cp .env.example .env

Ejemplo de .env:

    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/dashboard_db
    JWT_SECRET=clave_secreta
    JWT_EXPIRES_IN=7d
    FRONTEND_URL=http://localhost:5173

Inicia el backend:

    npm run dev

El backend estara disponible en http://localhost:5000

### 2. Configurar el frontend

    cd ../frontend
    npm install

Copia el archivo .env.example a .env y edita la URL de la API si es necesario:

    cp .env.example .env

Ejemplo de .env:

    VITE_API_URL=http://localhost:5000/api

Inicia el frontend:

    npm run dev

El frontend estara disponible en http://localhost:5173

## Ejemplos de requests

### Registrar usuario

POST /api/auth/register

    {
      "name": "Juan",
      "email": "juan@email.com",
      "password": "123456"
    }

Respuesta esperada:

    {
      "success": true,
      "message": "Usuario registrado exitosamente",
      "data": {
        "user": {
          "id": "...",
          "name": "Juan",
          "email": "juan@email.com"
        },
        "token": "..."
      }
    }

### Iniciar sesion

POST /api/auth/login

    {
      "email": "juan@email.com",
      "password": "123456"
    }

Respuesta esperada:

    {
      "success": true,
      "message": "Login exitoso",
      "data": {
        "user": {
          "id": "...",
          "name": "Juan",
          "email": "juan@email.com"
        },
        "token": "..."
      }
    }

### Crear item (requiere token)

POST /api/items
Headers:
    Authorization: Bearer <token>

    {
      "title": "Mi tarea",
      "description": "Descripcion de la tarea",
      "status": "pending"
    }

### Obtener items del usuario (requiere token)

GET /api/items
Headers:
    Authorization: Bearer <token>

Respuesta esperada:

    {
      "success": true,
      "count": 1,
      "data": [
        {
          "_id": "...",
          "title": "Mi tarea",
          "description": "Descripcion de la tarea",
          "status": "pending",
          "user": "...",
          "createdAt": "..."
        }
      ]
    }

### Actualizar item (requiere token)

PATCH /api/items/:id
Headers:
    Authorization: Bearer <token>

    {
      "title": "Tarea actualizada",
      "status": "completed"
    }

### Eliminar item (requiere token)

DELETE /api/items/:id
Headers:
    Authorization: Bearer <token>

Respuesta esperada:

    {
      "success": true,
      "message": "Item eliminado exitosamente"
    }

