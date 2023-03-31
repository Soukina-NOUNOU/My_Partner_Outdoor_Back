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