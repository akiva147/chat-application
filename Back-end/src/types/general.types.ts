export type User = {
  id: string;
  username: string;
};

export type Message = {
  message: string;
  username: string;
  room?: string;
};
