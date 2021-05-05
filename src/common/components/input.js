import { Button } from './button';

export const InputSearch = (props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={`input-search ${props.className}`}
    >
      <div className="shadow flex relative">
        <Input value={props.value} onChange={props.onChange} />
        <Button
          type="submit"
          className="absolute right-0 border font-bold border-transparent bg-white w-auto flex justify-end items-center p-5"
        >
          SEARCH
        </Button>
      </div>
    </form>
  );
};

InputSearch.defaultProps = {
  className: '',
};

export const Input = (props) => {
  return (
    <input
      className="w-full text-2xl p-4 rounded p-2 pr-8 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      type="text"
      placeholder="Search..."
      {...props}
    />
  );
};
