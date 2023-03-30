import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('create new blog', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const createButton = screen.getByText('create');

  const inputTitle = container.querySelector('#title');
  const inputAuthor = container.querySelector('#author');
  const inputUrl = container.querySelector('#url');

  await user.type(inputTitle, 'Bananabread');
  await user.type(inputAuthor, 'Flexi');
  await user.type(inputUrl, 'www.bananabread.com');

  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Bananabread');
  expect(createBlog.mock.calls[0][0].author).toBe('Flexi');
  expect(createBlog.mock.calls[0][0].url).toBe('www.bananabread.com');
});
