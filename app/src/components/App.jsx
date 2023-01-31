import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import Cards from './Cards.jsx';
import ModalOnRemove from './modal/ModalOnRemove.jsx';
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
    refShown.current.textContent = text === t('allCats') ? t('likedCats') : t('allCats');
    e.target.textContent = text === t('allCats') ? t('chooseAllCats') : t('chooseLikedCats');
    if (text === t('allCats')) {
      dispatch(showLiked());
    } else {
      dispatch(showAll());
    }
  };

  return (
    <Container>
      <ModalOnRemove />
      <Row>
        <h2 className="display-4 text-center m-2 m-md-5">{t('title')}</h2>
      </Row>
      <Row className="mb-5">
        <Col xs={12} md={6} className="text-center">
          <p className="lead" ref={refShown} data-testid="opposite-filter">{t('allCats')}</p>
        </Col>
        <Col xs={12} md={6} className="text-center align-items-center">
          <Button
            variant="secondary"
            className="filter-button btnBackg"
            onClick={handleClick}
            role="button"
            data-testid="filter-button"
          >
            {t('chooseLikedCats')}
          </Button>
        </Col>
      </Row>
      <Cards />
    </Container>
  );
};

export default App;
