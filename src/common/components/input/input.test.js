const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { InputSearch } = require('./input');

describe('Input', () => {
  describe('InputSearch', () => {
    test('Should Render InputSearch Component', () => {
      render(<InputSearch name="input-keyword" type="text" />);
      const form = screen.getByTitle('form');
      const input = screen.getByRole('textbox', { name: 'input-keyword' });
      const button = screen.getByRole('button', { name: 'SEARCH' });

      expect(form).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('Should have right value', () => {
      const value = 'my value';

      render(
        <InputSearch name="input-keyword" type="text" value={value} readOnly />
      );
      const input = screen.getByRole('textbox', { name: 'input-keyword' });

      expect(input).toHaveValue(value);
    });

    test('Should update input value when change the input', () => {
      let value = '';
      const newValue = 'my new value';
      const onChange = jest.fn((e) => {
        value += e.target.value;
      });
      const Input = () => (
        <InputSearch
          name="input-keyword"
          type="text"
          value={value}
          onChange={onChange}
        />
      );

      const { rerender } = render(<Input />);

      const input = screen.getByRole('textbox', { name: 'input-keyword' });

      userEvent.type(input, newValue);

      rerender(<Input />);

      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue(newValue);
    });
  });

  describe('SuggestionList', () => {
    test('should not render suggestion list', () => {
      render(
        <InputSearch name="input-keyword" type="text" suggestionList={[]} />
      );
      const suggestionList = screen.queryByRole('list');
      expect(suggestionList).not.toBeInTheDocument();
    });

    test('should render suggestion list', () => {
      const suggestionListMock = ['Batman', 'Suparman', 'Saras'];

      render(
        <InputSearch
          name="input-keyword"
          type="text"
          suggestionList={suggestionListMock}
        />
      );
      const suggestion = screen.queryByRole('list');
      const suggestionList = screen
        .getAllByRole('listitem')
        .map((li) => li.textContent);

      expect(suggestion).toBeInTheDocument();
      expect(suggestionList).toHaveLength(suggestionListMock.length);
      expect(suggestionList).toEqual(suggestionListMock);
    });
  });
});
