module.exports = {
    formatDate (date) {
        const validFormat = date.split('-').reverse().join('/');
        return validFormat;
    },
    
    unFormatDate (date) {
        const validFormat = date.split('/').reverse().join('-');
        return validFormat;
    }
};
