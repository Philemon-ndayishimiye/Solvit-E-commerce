type gender = "male" | "female";
export interface Login {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  gender?: gender;
  password: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
}
