export interface Login {
    email: string,
    password: string;
}


export interface Register {  
  email: string;
  first_name: string;
  password: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created: string;
  updated: string;
}