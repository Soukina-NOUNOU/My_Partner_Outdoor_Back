function formatDate (date) {
    const validFormat = date.split('-').reverse().join('/');
    return validFormat;
};

module.exports = formatDate;