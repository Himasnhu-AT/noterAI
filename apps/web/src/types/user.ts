//! TLDR: UPDATE THIS

export interface UserProfile {
  id: number;
  name: string;
  userName: string;
  email: string;
  token: string;
  isVerified: boolean;

  books: Book[];
  settings: UserSettings;

  createdAt: Date;
  updatedAt: Date;
}

interface Book {
  id: string;
}

interface UserSettings {
  id: string;
}
