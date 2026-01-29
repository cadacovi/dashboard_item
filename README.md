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

## Despliegue en Vercel

Este proyecto esta configurado para desplegarse completamente en Vercel (frontend + backend como serverless functions).

### Pasos para desplegar:

1. **Haz push de tu codigo a GitHub:**

```bash
git add .
git commit -m "Configurar proyecto para Vercel"
git push origin main
```

2. **En Vercel Dashboard:**
   - Importa tu repositorio de GitHub
   - Vercel detectara automaticamente la configuracion de `vercel.json`

3. **Configura las variables de entorno en Vercel:**
   - Ve a Settings → Environment Variables
   - Agrega las siguientes variables:
     - `MONGODB_URI`: Tu connection string de MongoDB Atlas
     - `JWT_SECRET`: Una clave secreta para JWT
     - `JWT_EXPIRES_IN`: `7d`
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: URL de tu deployment (ej: `https://tu-app.vercel.app`)

4. **Despliega:**
   - Vercel construira automaticamente el frontend y configurara el backend como serverless functions
   - Tu API estara disponible en `https://tu-app.vercel.app/api`
   - El frontend en `https://tu-app.vercel.app`

**Nota:** Asegurate de usar MongoDB Atlas (nube) ya que Vercel no soporta bases de datos locales.

