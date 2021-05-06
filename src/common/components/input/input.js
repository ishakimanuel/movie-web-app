import { Button } from '../button/button';

export const InputSearch = (props) => {
  const {
    onSubmit,
    className,
    suggestionList,
    onClickSuggestion,
    ...inputProps
  } = props;

  return (
    <form
      title="form"
      onSubmit={onSubmit}
      className={`input-search ${className}`}
    >
      <div className="shadow flex relative">
        <Input {...inputProps} />
        <Button
          type="submit"
          className="absolute right-0 border font-bold border-transparent bg-white w-auto flex justify-end items-center p-5"
        >
          SEARCH
        </Button>
      </div>
      {!!suggestionList.length && (
        <ul
          className="p-4 suggestion-list grid  bg-dark text-white"
          style={{ maxHeight: '200px', overflowY: 'scroll' }}
        >
          {props.suggestionList.map((suggestion, i) => (
            <li
              key={i}
              onClick={() => onClickSuggestion(suggestion)}
              className="mb-2 underline cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

InputSearch.defaultProps = {
  className: '',
  suggestionList: [],
  onClickSuggestion: () => null,
};

export const Input = (props) => {
  return (
    <input
      className="w-full text-2xl p-4 rounded p-2 pr-8 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      type="text"
      placeholder="Search..."
      aria-label={props.name}
      {...props}
    />
  );
};
