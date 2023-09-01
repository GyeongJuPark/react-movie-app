import { FC } from 'react';
import styles from './ScreenHeader.module.css';
import { Link } from 'react-router-dom';

interface ScreenHeaderProps {
    pathname : string;
}

const ScreenHeader : FC<ScreenHeaderProps> =({
    pathname = '',
}) => {
    return (
        <header className={styles.headerContainer}>
        <ul className={styles.ul}>
            <div className={styles.image}>
                <Link to="/" className={styles.scLink}></Link>
            </div>
            <li className={`${styles.li} ${pathname === '/' && styles.current}`}>
                <Link to="/" className={styles.scLink}>
                홈
                </Link>
            </li>
            <li className={`${styles.li} ${pathname.includes('/movie') && styles.current}`}>
                <Link to="/movie" className={`${styles.scLink}
                ${pathname.includes('/movie') && styles.current}`}>
                    영화    
                </Link>
            </li>
        </ul>
        </header>
    );
};

export default ScreenHeader;