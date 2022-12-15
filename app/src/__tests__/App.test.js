import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from '../components/App.jsx';

test('renders learn react link', () => {
  render(<App />);
  const button = screen.getByTestId("button");
  expect(button.innerHTML).toBe('Показать всех котов');
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.innerHTML).toBe('Показать понравившихся котов');
});