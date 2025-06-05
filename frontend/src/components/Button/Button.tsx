import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
    return <button className={styles.button}>{children}</button>;
};