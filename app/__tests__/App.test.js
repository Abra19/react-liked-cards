import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import App from '../src/components/App.jsx';
import resources from '../src/locales/index.js';
import store from '../src/slices/index.js';

const server = setupServer();

const i18n = i18next.createInstance();

const init = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
};

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      // eslint-disable-next-line
      console.warn(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });
  init();
});

const vdom = (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
);

const texts = ['Кот 1', 'Кот 2', 'Кот 3', 'Кот 4'];

const imgs = ['Рисунок 1', 'Рисунок 2', 'Рисунок 3', 'Рисунок 4'];

describe('Cards loaded', () => {
  beforeEach(() => {
    server.use(
      rest.get('https://meowfacts.herokuapp.com/', (req, res, ctx) => res(ctx.json({ data: texts }))),
      rest.get('https://shibe.online/api/cats', (req, res, ctx) => res(ctx.json(imgs))),
    );
    render(vdom);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test('initial state - all cards on page', async () => {
    const cards = await screen.findAllByTestId('cat-card');
    const cardImgs = await screen.findAllByRole('img');
    const cardTexts = await screen.findAllByTestId('card-text');

    expect(cards.length).toBe(4);
    expect(cardImgs.length).toBe(4);
    expect(cardTexts.length).toBe(4);

    cardTexts.forEach((cardText, i) => expect(cardText).toHaveTextContent(`Кот ${i + 1}`));
    cardImgs.forEach((cardImg, i) => expect(cardImg).toHaveAttribute('src', `Рисунок ${i + 1}`));
  });
});

describe('Like cards and filter liked', () => {
  beforeEach(() => {
    server.use(
      rest.get('https://meowfacts.herokuapp.com/', (req, res, ctx) => res(ctx.json({ data: texts }))),
      rest.get('https://shibe.online/api/cats', (req, res, ctx) => res(ctx.json(imgs))),
    );
    render(vdom);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test('can make like and filter liked cards', async () => {
    const likeButton1 = await screen.findByTestId('liked-button-6');
    const likeButton3 = await screen.findByTestId('liked-button-8');

    await userEvent.click(likeButton1);
    await userEvent.click(likeButton3);

    const likeImg1 = screen.getByTestId('like-6');
    const likeImg2 = screen.getByTestId('like-8');

    expect(likeImg1).toHaveAttribute('fill', 'darkolivegreen');
    expect(likeImg2).toHaveAttribute('fill', 'darkolivegreen');

    const filterButton = screen.getByTestId('filter-button');
    const textOpposite = await screen.findByTestId('opposite-filter');
    expect(filterButton).toHaveTextContent('Показать понравившихся котов');
    expect(textOpposite).toHaveTextContent('Выбрана полная коллекция котов');
    await userEvent.click(filterButton);

    const cards = await screen.findAllByTestId('cat-card');
    const cardTexts = await screen.findAllByTestId('card-text');
    expect(cards.length).toBe(2);
    expect(cardTexts.length).toBe(2);
    expect(cardTexts[0]).toHaveTextContent('Кот 2');
    expect(cardTexts[1]).toHaveTextContent('Кот 4');

    expect(textOpposite).toHaveTextContent('Выбраны понравившиеся коты');
    expect(filterButton).toHaveTextContent('Показать всех котов');

    await userEvent.click(filterButton);
    const newCards = await screen.findAllByTestId('cat-card');
    expect(filterButton).toHaveTextContent('Показать понравившихся котов');
    expect(textOpposite).toHaveTextContent('Выбрана полная коллекция котов');
    expect(newCards.length).toBe(4);
  });
});

describe('Delete card', () => {
  beforeEach(() => {
    server.use(
      rest.get('https://meowfacts.herokuapp.com/', (req, res, ctx) => res(ctx.json({ data: texts }))),
      rest.get('https://shibe.online/api/cats', (req, res, ctx) => res(ctx.json(imgs))),
    );
    render(vdom);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test('can delete card', async () => {
    const cards = await screen.findAllByTestId('cat-card');
    expect(cards.length).toBe(4);
    const deleteButton = await screen.findByTestId('delete-button-9');
    await userEvent.click(deleteButton);

    const modalTitle = await screen.findByTestId('modal-title');
    expect(modalTitle).toHaveTextContent('Вы действительно хотите удалить данную карточку?');

    const closeButton = screen.getByTestId('modal-close');
    await userEvent.click(closeButton);
    const allCards = await screen.findAllByTestId('cat-card');
    expect(allCards.length).toBe(4);

    await userEvent.click(deleteButton);
    const modalButton = screen.getByTestId('modal-delete');
    await userEvent.click(modalButton);
    const newCards = await screen.findAllByTestId('cat-card');
    expect(newCards.length).toBe(3);
    const cardTexts = await screen.findAllByTestId('card-text');
    expect(cardTexts.length).toBe(3);
    const empty = cardTexts.filter((text) => text === 'Кот 2');
    expect(empty.length).toBe(0);
  });
});

afterAll(() => {
  server.close();
});
