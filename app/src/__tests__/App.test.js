/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useTranslation } from 'react-i18next';

import App from '../components/App.jsx';

let container = null;

beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('changes value when clicked', () => {
  const onClick = jest.fn();
  const { t } = useTranslation();
  act(() => {
    render(<App />, container);
  });

  // получаем элемент button и кликаем на него несколько раз
  const button = document.querySelector('.filter-button');
  expect(button.innerHTML).toBe(t('chooseLikedCats'));

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe(t('chooseAllCats'));

  act(() => {
    for (let i = 0; i < 5; i += 1) {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });

  expect(onClick).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe(t('chooseAllCats'));
});
