export type UserRole = 'guest' | 'admin' | 'staff';

export type ViewType = 
  | 'home' 
  | 'calendar'
  | 'register' 
  | 'download'
  | 'other_docs' 
  | 'ebook' 
  | 'social' 
  | 'gallery' 
  | 'contact' 
  | 'qa' 
  | 'evaluation' 
  | 'manual' 
  | 'admin';

export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  projectId?: string;
}

export interface SessionItem {
  id: string;
  date?: string;
  time: string;
  title: string;
  tag: string;
  tagColor: string;
  room: string;
  isActive: boolean;
  projectId?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  location?: string;
  isActive: boolean;
  links?: {
    register?: string;
    download?: string;
    other_docs?: string;
    ebook?: string;
    social?: string;
    gallery?: string;
    contact?: string;
    evaluation?: string;
    manual?: string;
    qa?: string;
  };
  features?: Record<string, boolean>;
  documents?: {
    id: string;
    name: string;
    date: string;
  endDate?: string;
    url: string;
  }[];
  other_documents?: {
    id: string;
    name: string;
    date: string;
    endDate?: string;
    url: string;
  }[];
  ebook_documents?: {
    id: string;
    name: string;
    date: string;
    endDate?: string;
    url: string;
  }[];
}


export interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  description: string;
  category?: 'meeting' | 'training' | 'social' | 'other';
  isProjectEvent?: boolean;
}

export interface QAQuestion {
  id: number;
  q: string;
  time: string;
  isAnswered: boolean;
  answer?: string;
}


export interface ContactItem {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  projectId?: string;
}
