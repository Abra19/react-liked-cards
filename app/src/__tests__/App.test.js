/* eslint-disable functional/no-let */

import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';

import App from '../components/App.jsx';
import resources from '../locales/index.js';
import store from '../slices/index.js';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const i18n = i18next.createInstance();

const init = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
};
const renderApp = () => (
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>,
    container,
  )
);

test('changes value when clicked filter button', async () => {
  init();
  renderApp();

  const button = screen.getByRole('button');
  expect(button.textContent).toBe('Показать понравившихся котов');
  await userEvent.click(screen.getByRole('button'));
  expect(button.textContent).toBe('Показать всех котов');
  await userEvent.click(screen.getByRole('button'));
  expect(button.textContent).toBe('Показать понравившихся котов');
});

/*
тесты для reacta пока писать не умею - но попыталась настроить и войти в тему - поняла,
что надо подтягивать теоретическую базу
*/
