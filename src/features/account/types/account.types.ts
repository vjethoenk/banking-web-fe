export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface AccountFormData {
  username: string;
  email: string;
  phone?: string;
  address?: string;
  citizenId?: string;
  dateOfBirth?: string;
  avatar?: string;
  gender?: string | Gender;
}

export interface ReceiverAccountType {
  accountNumber: string;
  accountType: string;
  username: string
}