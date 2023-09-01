// 데이터를 받아서 화면에 뿌려주는 역할

import React from 'react';
import ProTypes from 'prop-types';

interface HomeProps {
    movieDetail : any;
    loading : boolean;
}

const HomePresenter : React.FC<HomeProps> = ({
movieDetail,
loading
}) => {
    return (
        <div>홈</div>
    )
}

HomePresenter.propTypes ={
    movieDetail : ProTypes.object,
    loading : ProTypes.bool.isRequired
}

export default HomePresenter;