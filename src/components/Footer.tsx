export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black py-10 text-white layout-container">
      {/* GitHub link & boonsuen.com website link */}
      <div className="flex flex-col font-light items-start justify-center gap-2">
        <a
          href="https://github.com/boonsuen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity duration-500 ease-in-out"
        >
          GITHUB
        </a>
        <a
          href="https://boonsuen.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity duration-500 ease-in-out"
        >
          BOONSUEN.COM
        </a>
      </div>
      <div className="flex justify-end mt-10">
        <p className="text-sm font-light">&copy; {year} Boon Suen</p>
      </div>
    </footer>
  );
};
