import rootStyles from '../../../app/page.module.css';
import Link from 'next/link';

export const PleaseLogin = () => {
  return (
    <div className={rootStyles.main}>
      <div className={rootStyles.card}>
        <h1>You are not logged in!</h1>
        <Link href="/auth">Please go To Login</Link>
      </div>
    </div>
  );
};
