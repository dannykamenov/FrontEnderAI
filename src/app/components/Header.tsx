import Link from 'next/link';

const Header = () => {
  return (
      <nav>
        <Link href="/">
          FrontEnderAI
        </Link>
        <Link href="/about">
          About
        </Link>
        {/* Add more links as needed */}
      </nav>
  );
};

export default Header;