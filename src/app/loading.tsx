import styles from './page.module.css';

const Loading = () => {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 style={{ marginTop: '50px', marginBottom: '200px' }}>
          Loading ...
        </h1>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Loading;
