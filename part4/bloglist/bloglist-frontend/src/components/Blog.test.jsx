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

  test('pressing the like button twice, the eventhandler is run twice', async () => {
    const mockHandler = vi.fn();
    const user = userEvent.setup();
    const button = screen.getByText('Expand');
    await user.click(button);

    const likeButton = screen.getByText('Like!');
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
  })
})
