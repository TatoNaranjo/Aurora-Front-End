import styles from './Button.module.css';
import type { ButtonProps } from './ButtonTypes';

export const Button: React.FC<ButtonProps> = ({variant = 'primary', children, ...rest}) =>{
    const className =`${styles.base} ${styles[variant]}`
    return(
        <button className = {className} {...rest}>{children}</button>
    )
}
