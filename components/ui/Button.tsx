import React from 'react';
import '../styles/main.scss';

export interface ButtonProps {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  /**
   * Button size
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'lg';
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Icon only button
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * Child elements (button content)
   */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * CTA button with multiple variants and sizes.
 * Accessible with keyboard navigation and focus states.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Get Started
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  iconOnly = false,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
  children,
}) => {
  const getButtonClasses = () => {
    const classes = ['btn'];
    
    classes.push(`btn--${variant}`);
    if (size !== 'base') classes.push(`btn--${size}`);
    if (fullWidth) classes.push('btn--full');
    if (iconOnly) classes.push('btn--icon');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
