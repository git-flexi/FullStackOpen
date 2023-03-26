import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'Bananabread',
  author: 'Flexi',
  url: 'www.bananabread.com',
  likes: '20153',
};

test('default visibility of blogs', () => {
  const { container } = render(<Blog blog={blog} />);

  const blogDiv = container.querySelector('.blogTitle');
  expect(blogDiv).toHaveTextContent('Bananabread by Flexi');

  const blogPropContainer = container.querySelector('.blogPropContainer');
  expect(blogPropContainer).toHaveStyle('display: none');
});

test('show details on click', async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const blogPropContainer = container.querySelector('.blogPropContainer');
  expect(blogPropContainer).not.toHaveStyle('display: none');
});

test('clicking the button calls event handler twice', async () => {
  const mockHandler = jest.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
