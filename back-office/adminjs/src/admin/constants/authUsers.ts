export type AuthUser = {
  email: string;
  password: string;
  title: string;
  theme: string;
};

export const AuthUsers: AuthUser[] = [
  {
    email: 'dev1@socializus.org',
    password: 'gemI8EeFy495jw3',
    title: 'Admin',
    theme: 'light',
  },
];
