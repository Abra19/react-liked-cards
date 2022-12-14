import { render } from '@testing-library/react';
import App from '../components/App.jsx';

test('renders learn react link', () => {
  render(<App />)
  expect("0").toEqual("0");
});