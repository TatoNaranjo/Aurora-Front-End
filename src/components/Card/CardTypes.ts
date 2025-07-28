export type CardAlignment = 'left' | 'center' | 'right';

export interface CardProps{ 
  alignment?: CardAlignment;
  children: React.ReactNode;
  iconURL?:string;
}