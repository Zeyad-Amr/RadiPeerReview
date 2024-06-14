class Filter {
    static equals(field: string, value: string): FilterQuery {
        return { filter: `${field}:eq:${value}` };
    }

    static notEquals(field: string, value: string): FilterQuery {
        return { filter: `${field}:neq:${value}` };
    }

    static greaterThan(field: string, value: string): FilterQuery {
        return { filter: `${field}:gt:${value}` };
    }

    static greaterThanOrEquals(field: string, value: string): FilterQuery {
        return { filter: `${field}:gte:${value}` };
    }

    static lessThan(field: string, value: string): FilterQuery {
        return { filter: `${field}:lt:${value}` };
    }

    static lessThanOrEquals(field: string, value: string): FilterQuery {
        return { filter: `${field}:lte:${value}` };
    }

    static like(field: string, pattern: string): FilterQuery {
        return { filter: `${field}:like:${pattern}` };
    }

    static startsWith(field: string, value: string): FilterQuery {
        return { filter: `${field}:stw:${value}` };
    }

    static isNull(field: string): FilterQuery {
        return { filter: `${field}:isnull` };
    }

    static isNotNull(field: string): FilterQuery {
        return { filter: `${field}:isnotnull` };
    }

    static sortAscending(field: string): FilterQuery {
        return { filter: `${field}:asc`, isSort: true };
    }

    static sortDescending(field: string): FilterQuery {
        return { filter: `${field}:desc`, isSort: true };
    }

    static custom(filter: string): FilterQuery {
        return { filter, isCustom: true };
    }

    static anyOf(field: string, values: string[]): FilterQuery {
        return { filter: `${field}:any:${values.join(",")}` };
    }
}

interface FilterQuery {
    filter: string;
    isSort?: boolean;
    isCustom?: boolean;
}

export default Filter;
export type { FilterQuery };

