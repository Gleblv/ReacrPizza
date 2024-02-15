import styles from './NotFoundInfo.module.scss';

const NotFoundInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.smile}>😞</div>
      <h1 className={styles.heading}>
        К сожалению, <br /> ничего не найдено
      </h1>
      <p className={styles.text}>Данная страница отсутвует</p>
    </div>
  );
};

export default NotFoundInfo;
