import 'server-only';

import Image from 'next/image';

export const GifComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Image
        src="/assets/sc.gif"
        width="400"
        height="150"
        alt="gif"
        style={{ marginBottom: '50px' }}
      ></Image>
      {children}
    </>
  );
};
