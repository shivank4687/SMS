import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; // Key for storing metadata
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);