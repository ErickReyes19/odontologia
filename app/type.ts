export type PaginateOptions<T> = {
  page?: number;
  pageSize?: number;
  where?: T;
  orderBy?: any;
};

type PaginatedResult<R> = {
  data: R[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export async function paginate<ModelResult, WhereInput>({
  model,
  page = 1,
  pageSize = 10,
  where,
  orderBy,
  select,
}: {
  model: {
    findMany: Function;
    count: Function;
  };
  page?: number;
  pageSize?: number;
  where?: WhereInput;
  orderBy?: any;
  select?: any;
}): Promise<PaginatedResult<ModelResult>> {
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    model.findMany({
      skip,
      take: pageSize,
      where,
      orderBy,
      select,
    }),
    model.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
  };
}
