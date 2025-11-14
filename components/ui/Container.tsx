import React from 'react';
import '../styles/main.scss';

export interface ContainerProps {
  /**
   * Maximum width variant
   * @default '5xl' (80rem / 1280px)
   */
  maxWidth?: '5xl' | '7xl' | 'full' | 'narrow';
  /**
   * Remove horizontal padding
   * @default false
   */
  noPadding?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements
   */
  children: React.ReactNode;
}

/**
 * Container Component
 * 
 * Wraps content with max-width and horizontal padding.
 * Centers content on the page with responsive padding.
 * 
 * @example
 * ```tsx
 * <Container maxWidth="5xl">
 *   <h1>Welcome</h1>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  maxWidth,
  noPadding = false,
  className = '',
  children,
}) => {
  const getContainerClass = () => {
    const classes = ['container'];
    
    if (maxWidth === 'narrow') classes.push('container--narrow');
    if (maxWidth === '7xl') classes.push('container--wide');
    if (maxWidth === 'full') classes.push('container--full');
    if (noPadding) classes.push('container--no-padding');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <div className={getContainerClass()}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';
