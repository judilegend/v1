export interface Chat {
  id: string;
  name: string;
  type: "direct" | "room";
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  attachments: File[];
}
