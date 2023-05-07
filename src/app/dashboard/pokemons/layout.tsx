import { SetCookie } from '@/components/setCookie';

const PokemonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* call a CC SetCookie to set a server cookie id on dashboard mounted  */}
      <SetCookie />
      {children}
    </>
  );
};

export default PokemonsLayout;
