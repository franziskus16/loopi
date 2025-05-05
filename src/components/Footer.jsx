const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Loopi. Created by{" "}
          <a
            className="underline"
            href="https://francescgimenez.com"
            target="_blank"
          >
            Francesc Gimenez
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
