export default function pagination(params: { limit: number, page: number, total: number }): {
    offset?: number
    current?: number
    limit?: number
    total?: number
    pages: number
} {
    if (params.limit <= 0) {
        throw {
            statusCode: 400,
            msg: "Invalid limit"
        }
    }
    const limit = params.limit
    const pages = params.total === 0 ? 1 : Math.ceil(params.total / limit)
    if (params.page < 0 || params.page > pages) {
        throw {
            statusCode: 400,
            msg: "Invalid page number"
        }
    }
    const offset = params.page * limit - limit

    return {
        offset,
        current: params.page,
        limit,
        total: params.total,
        pages,
    }
}
