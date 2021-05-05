import axios from 'axios';
import { API_KEY } from 'common/constants/api.constant';
import { REQUEST_STATUS } from 'common/constants/request.constant';
// import store from 'store.redux';

export const requestSources = {};

const getReduxHelper = (requestId) => {
  // only works with redux builder callback
  const apiRequestReducer = (
    builder,
    thunkAction,
    {
      onFulfilled = () => null,
      onPending = () => null,
      onRejected = () => null,
      onError = () => null,
    }
  ) => {
    if (!builder || !thunkAction) return;
    const { pending, fulfilled, rejected } = thunkAction;
    builder
      .addCase(pending, (state, action) => {
        state.requestStatus = REQUEST_STATUS.pending;
        onPending(state, action);
      })
      .addCase(fulfilled, (state, action) => {
        if (state.requestStatus !== REQUEST_STATUS.error) {
          state.requestStatus = REQUEST_STATUS.succeeded;
          onFulfilled(state, action);
        }
      })
      .addCase(rejected, (state, action) => {
        state.requestStatus = REQUEST_STATUS.rejected;
        onRejected(state, action);
      });
    return builder;
  };

  return {
    apiRequestReducer,
  };
};

const apiService = (requestId) => {
  const { apiRequestReducer } = getReduxHelper(requestId);

  const onRequest = async (data) => {
    const source = requestSources[requestId];
    if (source) {
      source.cancel();
    }
    const request = axios.CancelToken.source();

    requestSources[requestId] = request;

    data.cancelToken = request.token;
    return data;
  };

  const onSuccessResponse = (response) => {
    delete requestSources[requestId];
    return response;
  };

  const onErrorResponse = (error) => {
    // store.dispatch(errorActionCreator(error));
    return Promise.reject(error);
  };

  const getInstance = () => {
    const apiInvoker = axios.create({
      baseURL: `https://www.omdbapi.com`,
    });

    apiInvoker.interceptors.request.use(onRequest);
    apiInvoker.interceptors.response.use(onSuccessResponse, onErrorResponse);

    return apiInvoker;
  };

  const request = (
    { endpoint = '', method = 'get', query = {} },
    body = {}
  ) => {
    const instance = getInstance();
    const combinedParams = getQueryParams({ apikey: API_KEY, ...query });
    return instance[method](`${endpoint}${combinedParams}`, body).then(
      (response) => {
        return response.data;
      }
    );
  };

  const getQueryParams = (params = {}) => {
    const paramEntries = Object.entries(params);
    if (!paramEntries.length) return '';

    const stringParams = paramEntries.map(
      (param, i) => `${param[0]}=${param[1]}`
    );

    return `?${stringParams.join('&')}`;
  };

  return {
    request,
    instance: getInstance(),
    apiRequestReducer,
  };
};

export default apiService;
