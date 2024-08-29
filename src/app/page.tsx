'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={'w-100 flex h-full items-center justify-center'}>
      {/*<Image*/}
      {/*  className={'absolute bottom-0 left-0 right-0 top-0 m-auto'}*/}
      {/*  src={'/LoL_Logo_Icon_Package/LoL_Logo_Gold/LoL_Logo_Flat_GOLD.svg'}*/}
      {/*  alt={'League of Legends Logo'}*/}
      {/*  width={383}*/}
      {/*  height={100}*/}
      {/*/>*/}
      {/*<Image*/}
      {/*  className={`absolute bottom-0 left-0 right-0 top-0 m-auto transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}*/}
      {/*  src={*/}
      {/*    '/LoL_Logo_Icon_Package/LoL_Logo_Rendered_Large/LoL_Logo_Rendered_LARGE.png'*/}
      {/*  }*/}
      {/*  alt={'League of Legends Logo'}*/}
      {/*  width={416}*/}
      {/*  height={100}*/}
      {/*/>*/}
    </div>
  );
}
