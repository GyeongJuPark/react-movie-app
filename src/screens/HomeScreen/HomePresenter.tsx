// 데이터를 받아서 화면에 뿌려주는 역할

import React from 'react';
import ProTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import styles from './HomePresenter.module.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';


interface HomeProps {
    movieDetail : any;
    loading : boolean;
    error: any;
}

const HomePresenter : React.FC<HomeProps> = ({
movieDetail,
loading,
error
}) => {
    return loading? (
        <Loader></Loader>
    ) : (
        <div className={styles.container}>
            <HelmetProvider>
                <Helmet>
                    <title>넷플릭스 - 홈</title>
                </Helmet>
            </HelmetProvider>

            <div>컨텐츠 적을 예정</div>
        </div>
    )
}

HomePresenter.propTypes ={
    movieDetail : ProTypes.object,
    loading : ProTypes.bool.isRequired
}

export default HomePresenter;