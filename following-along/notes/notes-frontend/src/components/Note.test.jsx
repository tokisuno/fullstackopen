import { render, screen } from '@testing-library/react';
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />);

  const element = screen.getText=('Component testing is done with react-testing-library');

  screen.debug(element);

  expect(element).toBeDefined();
})
