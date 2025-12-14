'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 z-30 w-full"
      style={{
        pointerEvents: 'auto',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
        Portfolio
      </Link>

      <ul
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
