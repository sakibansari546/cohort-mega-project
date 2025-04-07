const asyncHandler = (requestHandler) => {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      console.log(err);
      next(err);
    });
  };
};

export default asyncHandler;

// const hekl = asyncHandler(async () => {});
