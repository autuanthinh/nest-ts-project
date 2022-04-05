import { SetMetadata } from '@nestjs/common';

export const Role = (...role: Role[]) => SetMetadata('role', role);
