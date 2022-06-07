export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
}

export interface Role {
  id: string;
  title: RoleType;
}

export enum RoleType {
  USER = "USER",
  ADMIN = "ADMIN",
}
