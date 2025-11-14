import React from 'react';
import '../styles/main.scss';

export interface TextProps {
  /**
   * Text size variant
   * @default 'base'
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /**
   * Text color
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'muted-lighter' | 'primary' | 'white';
  /**
   * Font weight
   * @default 'normal'
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Render as specific HTML element
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Text content
   */
  children: React.ReactNode;
}

/**
 * Text Component
 * 
 * Body text with size, color, and weight variants.
 * Use for paragraphs and inline text.
 * 
 * @example
 * ```tsx
 * <Text size="lg" color="muted">
 *   This is a large muted text paragraph.
 * </Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  size = 'base',
  color = 'default',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  className = '',
  children,
}) => {
  const getTextClasses = () => {
    const classes = ['text'];
    
    if (size !== 'base') classes.push(`text--${size}`);
    if (color !== 'default') classes.push(`text--${color}`);
    if (weight !== 'normal') classes.push(`text--${weight}`);
    if (align !== 'left') classes.push(`text--${align}`);
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <Component className={getTextClasses()}>
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
