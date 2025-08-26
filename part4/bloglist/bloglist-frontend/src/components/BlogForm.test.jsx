import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('form calls event handler, created blog with correct input', async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByPlaceholderText('Wanna learn LaTeX?');
    const author = screen.getByPlaceholderText('Luke Smith');
    const url = screen.getByPlaceholderText('https://lukesmith.xyz/articles/wanna-learn-latex/');
    const saveButton = screen.getByText('Save!');

    await user.type(title, "this is a title");
    await user.type(author, "this is an author");
    await user.type(url, "https://tokisuno.rocks");
    await user.click(saveButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('this is a title');
    expect(createBlog.mock.calls[0][0].author).toBe('this is an author');
    expect(createBlog.mock.calls[0][0].url).toBe('https://tokisuno.rocks');
  })
})
