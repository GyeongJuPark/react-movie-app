// 데이터를 받아서 화면에 뿌려주는 역할

import React from 'react';
import ProTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import styles from './HomePresenter.module.css';

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
        <div>홈</div>
    )
}

HomePresenter.propTypes ={
    movieDetail : ProTypes.object,
    loading : ProTypes.bool.isRequired
}

export default HomePresenter;