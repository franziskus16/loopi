# Cymit Frontend Test (React)

---

# 🛍️ Loopi

Loopi es una tienda online hecha con React y Vite que simula un e-commerce moderno, consumiendo datos desde la API pública de [dummyjson.com](https://dummyjson.com/). El catálogo contiene productos variados como maquillaje, muebles, perfumes, ropa o comida.

## 🔧 Tecnologías utilizadas

- **React** + **Vite** — Framework principal y entorno de desarrollo rápido.
- **TailwindCSS** — Utilizado para un diseño responsive, limpio y modular.
- **React Router** — Para el sistema de navegación entre vistas.
- **Fetch API** — Para consumo de la API externa.
- **dummyjson.com API** — Fuente de datos dinámica con más de 100 productos.
- **Favicon personalizado** — Letra “L” en negrita con tipografía `System-UI`.

## 📁 Estructura del proyecto

/src
├── /components → Componentes reutilizables como Navbar, Footer, ProductCard
├── /pages → Vistas como Home, ProductDetails, About
├── /routes → Archivo con rutas definidas
├── /assets → Iconos, imágenes y el favicon
└── App.jsx → App principal con el router y layout base

## 💡 Decisiones técnicas

- **Tailwind** fue elegido por su integración rápida y estilos utilitarios, ideales para prototipar y escalar componentes sin sobrecargar CSS.
- **React Router DOM** permite una navegación fluida tipo SPA, sin recarga de página.
- Se implementó `w-full` condicional para adaptarse a mobile (`w-full md:w-auto`) y se usó `grid` para maquetación flexible.
- El catálogo de productos es dinámico: se mapea desde la API, y no es contenido estático.
- Se añadió una página `/about` que replica este README como documentación accesible desde la app.

## 🚀 Cómo ejecutar el proyecto

```bash
git clone https://github.com/franziskus16/loopi.git
cd loopi
npm install
npm run dev


Accede a http://localhost:5173 para ver la app en funcionamiento.

```

## 📎 Detalles extra

- El diseño tiene header, footer y menú responsive.
- El favicon fue generado con la letra L en negro, con tipografía System-UI Bold.
- Está preparado para añadir filtros y mejoras futuras como carrito, login o categorías.

## 👤 Autor

Francesc Gimenez Gil

Frontend Developer — Barcelona (Catalonia)
[francescgimenez.com](https://francescgimenez.com) • github.com/franziskus16
