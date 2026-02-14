
export type View = 'home' | 'courses' | 'about' | 'contact' | 'single' | 'login';

export interface Course {
  id: number;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  price: number;
  image: string;
  description: string;
  longDescription?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
