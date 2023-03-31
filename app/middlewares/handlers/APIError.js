class APIError extends Error {
    constructor(msg,code){
        super(msg);
        this.status = code;
    }
}

module.exports = APIError;