export const FILE = {
  IMAGE: {
    SIZE: {
      MAX: 1024 * 1024 * 5, // 5Mb
    },
    MIME_TYPE: {
      'image/png': true,
      'image/gif': true,
      'image/jpg': true,
      'image/jpeg': true,
      'image/webp': true,
    } as AcceptMimeType,
  },
};

export const PAGINATION_FIELDS = ['limit', 'page'];

export const SORT_FIELDS = ['sort'];

export const PAGINATION_DEFAULT = {
  page: 1,
  limit: 10,
};
