const About = () => (
  <section className="container mx-auto max-w-3xl px-4 py-10">
    <h1 className="text-3xl font-bold text-gray-900">About Loopi</h1>
    <p className="mt-4 text-gray-700">
      Loopi is a demo online shop. The catalogue comes from the free{" "}
      <a className="underline" href="https://dummyjson.com/docs/products">
        DummyJSON products API
      </a>
      , so prices and stock are not real and nothing can be bought.
    </p>
    <h2 className="mt-8 text-xl font-semibold text-gray-900">How it's built</h2>
    <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
      <li>React with Vite, and React Router for the pages.</li>
      <li>Tailwind CSS for a responsive layout.</li>
      <li>A small service layer on top of Axios for all API calls.</li>
    </ul>
    <p className="mt-8 text-gray-700">
      Built by Francesc Gimenez.{" "}
      <a className="underline" href="https://github.com/franziskus16/loopi">
        See the source code on GitHub
      </a>
      .
    </p>
  </section>
);

export default About;
