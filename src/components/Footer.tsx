export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-black py-10 text-white">
      <div className="flex justify-center mt-10">
        <p>&copy; {year} Boon Suen</p>
      </div>
    </div>
  );
};
