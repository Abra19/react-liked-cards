import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import _ from 'lodash';

import fetchData from '../slices/fetchData.js';


function Cards() {
  const { cards } = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    cards.length !== 0 && <div className="row mx-auto my-5">
      {cards.map((el) => (
        <div className="col-12 col-md-6 col-lg-4 col-xxl-3 my-5" key={_.uniqueId()} >
        <Card style={{ width: "300px", height: "600px" }} className="my-3 mx-auto" >
          <Card.Img variant="top" src={el.img} className="rounded covered mx-auto py-2"/>
          <Card.Body>
            <Card.Text className="overflow-auto" style={{ width: "280px", height: "250px" }}>{el.text}</Card.Text>
          </Card.Body>
        </Card>
        </div>
      ))}
    </div>
  );

}

export default Cards;