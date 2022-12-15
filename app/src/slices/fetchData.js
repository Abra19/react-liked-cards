import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const textResp = await axios.get(routes.textPath());
    const imgResp = await axios.get(routes.imgPath());
    const texts = textResp.data.data;
    const imgs = imgResp.data;
    return imgs.reduce((acc, img, i) => [...acc, { text: texts[i], img, liked: false }], []);
  },
);

export default fetchData;