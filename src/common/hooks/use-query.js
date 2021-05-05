const { useLocation } = require('react-router');

const useQuery = () => new URLSearchParams(useLocation().search);

export default useQuery;
