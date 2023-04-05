exports.catchErrors = (fn) => {
    return (req, res, next) => {
        return fn (req, res, next).catch(next);
    }
}

exports.notFound = (req, res, next) => {
    const error = new Error(`Page not found`);
    error.status = 404;
    next(error);
}

exports.errorsCollector = (error, req, res, next) => {
    const status = error.status || 500;
    error.status = status;
    return res.status(status).json(`${error}`);
}

exports.errorId = (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      const err = new Error('Invalid ID');
      err.statusCode = 400;
      return next(err);
    }
    next();
}


