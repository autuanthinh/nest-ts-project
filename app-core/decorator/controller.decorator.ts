import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

type Role = 'ADMIN' | 'USER';
export const Role = (...role: Role[]) => SetMetadata('role', role);
