export interface Document {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Block {
  id: string;
  type: string;
  content: any;
}
