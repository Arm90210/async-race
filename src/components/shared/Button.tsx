import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md';
}

function Button({ variant = 'secondary', size = 'md', className, children, ...rest }: ButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
