import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import Cards from './Cards.jsx';
import fetchData from '../slices/fetchData.js';
import { showLiked, showAll } from '../slices/dataSlice.js';

const App = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const refShown = useRef(null);

  const handleClick = (e) => {
    const text = refShown.current.textContent;
    if (text === t('allCats')) {
      refShown.current.textContent = t('likedCats');
      e.target.textContent = t('chooseAllCats');
      dispatch(showLiked());
    } else {
      refShown.current.textContent = t('allCats');
      e.target.textContent = t('chooseLikedCats');
      dispatch(showAll());
    }
  };

  return (
    <div className="container w-100">
      <div className="row">
        <h2 className="display-4 text-center m-2 m-md-5 mb-5">{t('title')}</h2>
      </div>
      <div className="row mb-5">
        <div className="col-12 col-md-6 text-left">
          <p className="lead" ref={refShown}>{t('allCats')}</p>
        </div>
        <div className="col-12 col-md-6 align-items-center">
          <Button
            variant="secondary"
            className="float-end filter-button"
            onClick={handleClick}
          >
            {t('chooseLikedCats')}
          </Button>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default App;
