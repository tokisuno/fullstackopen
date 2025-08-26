import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Blog from './Blog';


describe('<Blog />', () => {
  beforeEach(() => {
    const mockHandler = vi.fn();
    const blog = {
      title: "this is a blog",
      author: "jim bob",
      url: "https://google.com",
      user: 'haha'
    }

    render(<Blog blog={blog} addLike={mockHandler}/>);
  })

  test('at the start the children are not displayed', () => {
    const element = screen.getByText('LINK');
    expect(element).not.toBeVisible();
  })

  test('URL and likes are shown when pressing the expand button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Expand');
    await user.click(button);

    const url = screen.getByText('LINK');
    const likes = screen.getByText('likes', { exact: false });

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  })
})
test('clicking the button calls the event handler once', async () => {
  const blog = {
    title: 'article_title',
    author: 'john smith',
    url: 'https://myspace.com',
    user: 'xd'
  };

  const mockHandler = vi.fn();

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup();
  const button = screen.getByText('Like!');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
})
