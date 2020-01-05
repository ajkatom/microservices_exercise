const _ = require('lodash');

const graphQLErrorHandler = error => {
  const errorDetails = _.get(error, 'originalError.response.body');

  try {
    if (errorDetails) {
      return errorDetails;
    }
  } catch (e) {}
  return error;
};

export default graphQLErrorHandler;
