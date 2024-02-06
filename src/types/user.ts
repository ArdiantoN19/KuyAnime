export type RegisterUserType = {
  name: string;
  email: string;
  password?: string | undefined;
  image?: string;
  type?: string;
};

export type ResponseRegisterUserType = RegisterUserType & {
  id: number;
  created_at: Date;
  updated_at: Date;
};
