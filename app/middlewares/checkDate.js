const { unFormatDate } = require('../utils/formatDate');

module.exports = {
    checkDate (req, res, next) {
        if (req.body.start_date) {
            if (req.body.start_date.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/)) {
                req.body.start_date = unFormatDate(req.body.start_date);
            }
        };

        if (req.body.finish_date) {
            if (req.body.finish_date.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/)) {
                req.body.finish_date = unFormatDate(req.body.finish_date);
            }
        };
        next();
    }
};