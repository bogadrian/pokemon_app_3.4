'use client';

import { useState } from 'react';
import styles from './count-component.module.css';

export const CountComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <button onClick={() => setCount(count + 1)} className={styles.button}>
        Increase count
      </button>
      <span className={styles.span}>{count}</span>
      <button onClick={() => setCount(count - 1)} className={styles.button}>
        Decrease count
      </button>
    </div>
  );
};
