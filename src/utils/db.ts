import { getRepository, ObjectType, SelectQueryBuilder } from 'typeorm';

export const excludeColumns = <Entity>(
  entity: ObjectType<Entity>,
  columnsToExclude: string[],
): any =>
  getRepository(entity)
    .metadata.columns.map((column) => column.databaseName)
    .filter((columnName) => !columnsToExclude.includes(columnName));

export const addSorter = (
  queryBuilder: SelectQueryBuilder<any>,
  sorter: {
    order?: SORT_ORDER;
    field: string;
  },
): void => {
  if (sorter && sorter.field) {
    queryBuilder.orderBy(sorter.field, sorter.order || 'ASC');
  }
};

export const parseSorter = (
  sorter: string,
): {
  order?: SORT_ORDER;
  field: string;
} => {
  if (!sorter) {
    return;
  }

  let sign = sorter.substr(0, 1);
  if (['-', '+'].includes(sign)) {
    let field = sorter.substr(1);
    return {
      order: sign === '-' ? 'DESC' : 'ASC',
      field,
    };
  } else {
    return {
      field: sorter,
    };
  }
};
