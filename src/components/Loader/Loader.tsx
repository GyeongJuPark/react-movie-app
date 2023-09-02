import styles from './Loader.module.css';
import loadingBar from '../../assets/loading.svg';

const Loader = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.LoadingContainer}>
                {/* alt => 생략 가능, 이미지에 대한 설명 */}
                <img src={loadingBar} alt='loadingbar' />
                <div className={styles.Title}>
                Loading...
                </div>
            </div>

        </div>

    )
}

export default Loader;