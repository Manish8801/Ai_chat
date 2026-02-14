export type Chat = {
  title: string;
  messages: { content: string }[];
  createdAt: Date;
};
export type Chats = Chat[];
