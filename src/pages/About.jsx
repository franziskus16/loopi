const About = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        📄 Decisiones Técnicas — Loopi
      </h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        🏗️ Estructura del proyecto
      </h2>
      <p>
        El proyecto está dividido en componentes reutilizables como{" "}
        <code>Header</code>, <code>Footer</code>, <code>ProductCard</code>, etc.
        Se usa <strong>React Router</strong> para manejar las rutas (
        <code>/</code>, <code>/product/:id</code>, <code>/about</code>). Toda la
        estructura sigue un modelo modular en carpetas <code>pages/</code> y{" "}
        <code>components/</code>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        🧩 Librerías utilizadas
      </h2>
      <table className="w-full text-left border border-gray-300 my-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Librería</th>
            <th className="border px-4 py-2">Propósito</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">React</td>
            <td className="border px-4 py-2">
              Framework principal para construir la UI
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">React Router DOM</td>
            <td className="border px-4 py-2">Gestión de rutas SPA</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Tailwind CSS</td>
            <td className="border px-4 py-2">Estilizado rápido y utilitario</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">DummyJSON</td>
            <td className="border px-4 py-2">
              API falsa para obtener productos variados
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        📦 Elección de Tailwind CSS
      </h2>
      <p>
        Permite crear diseños responsive rápidamente. Facilita mantener un
        diseño coherente sin escribir CSS manual. El uso de clases como{" "}
        <code>md:</code> y <code>lg:</code> lo hace altamente adaptable a
        distintos dispositivos.
      </p>
      <p>
        Muchas partes de componentes los he sacado de{" "}
        <a
          className=" text-blue-900 underline"
          href="https://www.hyperui.dev/"
          target="_blank"
        >
          HyperUI
        </a>{" "}
        son gratuitos y visualmente son muy limpios y modernos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        🔁 Patrones y convenciones
      </h2>
      <ul className="list-disc ml-6">
        <li>
          <strong>Componentización:</strong> El código se divide en componentes
          concisos y reutilizables.
        </li>
        <li>
          <strong>Responsiveness:</strong> Uso de utilidades responsive de
          Tailwind.
        </li>
        <li>
          <strong>Separación lógica/presentación:</strong> La lógica se mantiene
          separada del renderizado visual.
        </li>
        <li>
          <strong>Uso del Inglés:</strong> En un principio lo queria hacer en
          Castellano pero como el contenido venia en ingés, me pareció más
          apropiado para que tuviera coherencia.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🌐 API de productos</h2>
      <p>
        He usado <code>https://dummyjson.com/products</code> para simular un
        catálogo diverso y realista. Los datos incluyen imágenes, precios,
        descripciones y categorías.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        🧪 Testing (opcional)
      </h2>
      <p>
        No he incluido testing en esta versión inicial, aunque me planteé usar{" "}
        <code>Vitest</code> o <code>React Testing Library</code> pero sería para
        versiones futuras con más contenido.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📁 Despliegue</h2>
      <p>
        El proyecto está preparado para desplegar en plataformas como{" "}
        <strong>Vercel</strong> o <strong>Netlify</strong>, usando{" "}
        <code>Vite</code> para construcción rápida.
      </p>
    </section>
  );
};

export default About;
