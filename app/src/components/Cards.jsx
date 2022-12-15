import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';

import AiTwoOneLikeMy from './AITwoOneLikeMy.jsx';
import { likedCard, deleteCard } from '../slices/dataSlice.js';

const Cards = () => {
  const { t } = useTranslation();

  const {
    data,
    errMessage,
    show,
  } = useSelector((state) => state.cardData);

  const dispatch = useDispatch();

  const handleLikeClick = (id) => {
    dispatch(likedCard(id));
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteCard(id));
  };

  if (errMessage !== 'sucsess' && errMessage !== null) {
    return (
      <div>
        {`${t('noConnection')} - ${errMessage}`}
      </div>
    );
  }

  if (data.length === 0 && !show) {
    return (
      <div>{t('waitDatas')}</div>
    );
  }

  return (
    <div className="row mx-auto my-5">
      {data.filter((el) => !el.deleted).map((el) => (
        <div className="col-12 col-md-6 col-lg-4 col-xxl-3 my-5" key={el.id}>
          <Card style={{ width: '300px', height: '650px' }} className="my-3 mx-auto">
            <Card.Img variant="top" src={el.img} className="rounded covered mx-auto py-2" />
            <Card.Body style={{ height: '350px' }}>
              <Card.Text
                className="overflow-auto"
                style={{ width: '280px', height: '250px' }}
              >
                {el.text}
              </Card.Text>
              <div className="p-3 d-flex justify-content-between align-items-end">
                <Button variant="white" onClick={() => handleLikeClick(el.id)}>
                  <AiTwoOneLikeMy id={el.id} />
                </Button>
                <Button variant="white" onClick={() => handleDeleteClick(el.id)}>
                  <AiOutlineDelete size={28} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Cards;
