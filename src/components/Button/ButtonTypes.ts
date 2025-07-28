export type ButtonType = 'primary' | 'accent' | 'secondary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: ButtonType;
}




















