import styles from "./Card.module.css"
import type { CardProps } from "./CardTypes"

export const Card: React.FC<CardProps> = ({alignment = 'left',children, iconURL}) =>{
    const className = `${styles.base} ${styles[alignment]}`;

    return (<div className = {className}>
        
        <div className = "iconDiv">
           {iconURL && <img src={iconURL} alt="Logo de Card" className={styles.icon} /> } 
        </div>
        
        <div className={styles.textContent}>
        {children}
        </div>
    </div>
    )
}

