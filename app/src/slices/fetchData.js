import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    try {
      const textResp = await axios.get(routes.textPath());
      const imgResp = await axios.get(routes.imgPath());
      const texts = textResp.data.data;
      const imgs = imgResp.data;
      const data = imgs.reduce((acc, img, i) => [...acc, {
        id: uniqueId(),
        text: texts[i],
        img,
        isLiked: false,
      }], []);
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
