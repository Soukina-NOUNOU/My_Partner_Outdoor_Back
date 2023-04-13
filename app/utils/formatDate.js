function formatDate (date) {
    const validFormat = date.split('-').reverse().join('/');
    console.log(validFormat);
    return validFormat;
};

formatDate('2023-04-13');

module.exports = formatDate;