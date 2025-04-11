function Header() {
  return (
    <header className="bg-white border-b shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-800 font-[League Spartan]">
          Style<span className="text-gray-600">Mate</span>
        </h1>

        {/* Optional future navbar or icon */}
        {/* <nav>...add nav links here...</nav> */}
      </div>
    </header>
  );
}

export default Header;
