import App from '#/App';
import { render, screen, userEvent } from 'utils/test-utils';
import { describe, it } from 'vitest';

// Tests
describe('Renders main page correctly', async () => {
  it('Should render the title', async () => {
    render(<App />);
    expect(screen.getByText('GKMIT React Boilerplate')).toBeInTheDocument();
  });

  it('Should increase count on click', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByText('count is 0');
    await user.click(button as HTMLButtonElement);
    await user.click(button as HTMLButtonElement);
    expect(button?.innerHTML).toBe('count is 2');
  });
});
