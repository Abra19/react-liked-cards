import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    try {
      const textResp = await axios.get(routes.textPath());
      const imgResp = await axios.get(routes.imgPath());
      const texts = textResp.data.data;
      const imgs = imgResp.data;
      const data = imgs.reduce((acc, img, i) => [...acc,
        { text: texts[i], img, liked: false }], []);
      return {
        data,
        err: 'sucsess',
      };
    } catch (err) {
      return { err: err.message };
    }
  },
);

export default fetchData;
