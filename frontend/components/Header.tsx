import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between p-2 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="/Logo.svg"
            alt="logo image"
          />
        </Link>

        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-black px-4 py-1 rounded-full">Follow</h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-blue-500">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-blue-500">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
