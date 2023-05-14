import rootStyles from '../page.module.css';
import styles from './auth.module.css';
import { FormComponent, CountComponent } from '@/components/client/auth';
import { GifComponent } from '@/components/server/GifComponent';

const Login = () => {
  return (
    <div className={rootStyles.main}>
      <div className={rootStyles.card}>
        {/* title does not need to stay in form which is a CC */}
        <h1 className={styles.title}>Login</h1>
        <FormComponent>
          <GifComponent>
            <CountComponent />
          </GifComponent>
        </FormComponent>
      </div>
    </div>
  );
};

export default Login;
