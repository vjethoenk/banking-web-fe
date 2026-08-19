// ---- User (simplified, from login response) ----
export interface User {
  id: string;
  username: string;
  email: string | null;
  roles: string[];
  phone?: string;
  permissions: string[];
  citizenId?: string;
  dateOfBirth?: string
  gender?: string
  address?: string
}

// ---- UserProfile (full, from /users/my-info) ----
export interface Permission {
  name: string;
  description: string | null;
}

export interface Role {
  name: string;
  description: string | null;
  permissions: Permission[];
}

export interface UserProfile {
  id: string;
  customerCode: string | null;
  username: string;
  email: string | null;
  phone: string | null;
  citizenId: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
  avatar: string | null;
  status: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  accounts: BankAccount[];
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
}

// ---- Auth ----
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  authenticated: boolean;
  user: User;
}

export interface RegisterRequest {
  username: string;
  password: string;
  phone: string;
  email: string;
}