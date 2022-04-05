type Role = 'ADMIN' | 'USER';

type SORT_ORDER = 'ASC' | 'DESC' | undefined | null;

type MimeType =
  | 'image/apng'
  | 'image/avif'
  | 'image/gif'
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/webp';

type AcceptMimeType = {
  [k in MimeType]?: boolean;
};
