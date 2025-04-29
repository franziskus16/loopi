# Cymit Frontend Test (React)

Gracias por participar en nuestro proceso de selección ✨

## 🧪 Objetivo

Crear una SPA en React que muestre productos con búsqueda y detalle. El diseño debe ser responsive y usable.

Para obtener los datos de los productos deberás consumir la API pública disponible en [https://dummyjson.com/products](https://dummyjson.com/products). Esta API proporciona un listado de productos con propiedades como nombre, precio, categoría, descripción e imagen. Deberás utilizar estos datos para construir tanto la pantalla de listado como la pantalla de detalle de producto.

### 📜 Requisitos

- Pantalla principal con lista de productos
- Búsqueda por nombre
- Filtro por categoría
- Página de detalle por producto (`/product/:id`)
- Tener instalado Git y Docker

### 💻 Stack

- React
- Vite
- Node.js 22
- API pública: [https://dummyjson.com/products](https://dummyjson.com/products)

> Puedes usar las librerías que consideres más adecuadas para completar el ejercicio.

### 🚀 Cómo ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/cymitquimica/cymit-pt-front
cd cymit-pt-front

# Levantar el entorno con Docker
docker compose up -d

# Acceder al contenedor
docker exec -it app bash

# Dentro del contenedor
npm install
npm run dev
```

La aplicación estará disponible en: [http://localhost:8010](http://localhost:8010)

### 📄 Entrega

- Sube tu código a un repositorio GitHub y compártenos el enlace.
- Añade un documento explicando las decisiones técnicas tomadas durante el desarrollo (estructura del proyecto,
librerías elegidas, patrones seguidos, etc.).

---

¡Buena suerte y gracias! 🙌

