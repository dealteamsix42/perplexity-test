import React from 'react';
import '../styles/main.scss';

export interface HeadingProps {
  /**
   * Heading level (h1-h6)
   * @default 'h2'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Text balance for better typography
   * @default false
   */
  balance?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Heading content
   */
  children: React.ReactNode;
}

/**
 * Heading Component
 * 
 * Semantic heading with responsive typography scales.
 * Use for page and section headings.
 * 
 * @example
 * ```tsx
 * <Heading level="h1" align="center" balance>
 *   Welcome to Our Platform
 * </Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  align = 'left',
  balance = false,
  className = '',
  children,
}) => {
  const Tag = level;
  
  const getHeadingClasses = () => {
    const classes = ['heading', `heading--${level}`];
    
    if (align !== 'left') classes.push(`text--${align}`);
    if (balance) classes.push('text--balance');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <Tag className={getHeadingClasses()}>
      {children}
    </Tag>
  );
};

Heading.displayName = 'Heading';
