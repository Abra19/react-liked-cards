import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';

import AiTwoOneLikeMy from './AITwoOneLikeMy.jsx';
import { likedCard } from '../slices/dataSlice.js';
import { openModal } from '../slices/modalSlice.js';

const Cards = () => {
  const { t } = useTranslation();

  const {
    data,
    errMessage,
    isLoaded,
    filter,
  } = useSelector((state) => state.cardData);

  const dispatch = useDispatch();

  const handleLikeClick = (id) => {
    dispatch(likedCard(id));
  };

  const handleDeleteClick = (id) => {
    dispatch(openModal(id));
  };

  if (errMessage !== 'sucsess' && errMessage !== null) {
    return (
      <div>
        {`${t('noConnection')} - ${errMessage}`}
      </div>
    );
  }

  if (data.length === 0 && !isLoaded) {
    return (
      <div>{t('waitDatas')}</div>
    );
  }

  const showedData = filter === 'liked' ? data.slice(0).filter((el) => el.isLiked) : data.slice(0);

  return (
    <Row className="mx-auto my-5">
      {showedData.filter((el) => !el.deleted).map((el) => (
        <Col xs={12} md={6} lg={4} xxl={3} className="my-3 mx-auto" key={el.id}>
          <Card style={{ width: '300px', height: '650px' }} className="my-3 mx-auto" data-testid="cat-card">
            <Card.Img variant="top" src={el.img} className="rounded covered mx-auto py-2" />
            <Card.Body style={{ height: '350px' }}>
              <Card.Text
                className="overflow-auto"
                style={{ width: '280px', height: '250px' }}
                data-testid="card-text"
              >
                {el.text}
              </Card.Text>
              <div className="p-3 d-flex justify-content-between align-items-end">
                <Button variant="white" onClick={() => handleLikeClick(el.id)} data-testid={`liked-button-${el.id}`}>
                  <AiTwoOneLikeMy id={el.id} />
                </Button>
                <Button variant="white" onClick={() => handleDeleteClick(el.id)} data-testid={`delete-button-${el.id}`}>
                  <AiOutlineDelete size={28} fill="darkolivegreen" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Cards;
