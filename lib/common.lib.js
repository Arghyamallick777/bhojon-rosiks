const CommonLib = {
    isEmpty(data) {
        switch(typeof data) {
            case 'string': return !data || data === "";
            case 'number': return !data;
            case 'object': return !Object.keys(data).length;
            default: return false;
        }
    },
    getPagination(page, limit, total) {
        const pagination = {
            currentPage: page,
            lastPage: 0,
            perPage: limit,
            total: 0
        };
        pagination.lastPage = Math.ceil(total / limit);
        pagination.total = total;
        return pagination;
    },
    getOffset(page, limit) {
        return (page - 1) * limit;
    }
};

module.exports = CommonLib;