const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { MemoryRouter } = require('react-router');
const { Button } = require('./button');

describe('Button', () => {
  test('Should Render primary button', () => {
    const { container } = render(<Button theme="primary" />);

    expect(container.firstChild.classList.contains('bg-primary')).toBe(true);
  });

  test('Should Render big button', () => {
    const { container } = render(<Button theme="primary" size="big" />);

    expect(container.firstChild.classList.contains('p-4')).toBe(true);
    expect(container.firstChild.classList.contains('text-2xl')).toBe(true);
  });

  test('should render link button', () => {
    const url = '/movies';

    render(
      <MemoryRouter>
        <Button isLink to={url} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', url);
  });

  test('Should run onClick function', () => {
    const onClick = jest.fn();
    render(<Button theme="primary" size="big" onClick={onClick} />);
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
