const asyncHandler = (fn: Function) => {
  return async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
      // next(err);
    } catch (err) {
      next(err);
    }
  };
};

export = asyncHandler;
