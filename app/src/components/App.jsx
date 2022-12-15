import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import Cards from './Cards.jsx';

const App = () => {
  const { t } = useTranslation();
  const refShown = useRef(null);
  const refButton = useRef(null);

  const handleClick = () => {
    const text = refShown.current.textContent;
    if (text === t('allCats')) {
      refShown.current.textContent = t('likedCats');
      refButton.current.textContent = t('chooseAllCats');
    } else {
      refShown.current.textContent = t('allCats');
      refButton.current.textContent = t('chooseLikedCats');
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
            ref={refButton}
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
