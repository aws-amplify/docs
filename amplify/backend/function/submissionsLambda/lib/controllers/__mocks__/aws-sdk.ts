export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const putFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

class DocumentClient {
  put = putFn;
}

export const DynamoDB = {
  DocumentClient,
};