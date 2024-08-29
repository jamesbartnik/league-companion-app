'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFire } from 'react-icons/fa';

const links = [
  { name: 'Home', href: '/', icon: FaFire },
  { name: 'Champions', href: '/champions', icon: FaFire },
  { name: 'Items', href: '/items', icon: FaFire },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md py-3 font-medium transition duration-300 hover:bg-[--blue-4]',
              {
                'text-[--blue-1]': pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
