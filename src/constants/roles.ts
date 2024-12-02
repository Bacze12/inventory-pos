// backend/src/constants/roles.ts
export const ROLES = {
    ADMIN: 'ADMIN',
    INVENTORY: 'INVENTORY',
    CASHIER: 'CASHIER'
  } as const;
  
  export type Role = typeof ROLES[keyof typeof ROLES];