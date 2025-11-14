import React from 'react';
import '../styles/main.scss';

export interface GridLayoutProps {
  /**
   * Number of columns (responsive)
   * @default 2
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Gap size between grid items
   * @default 'base'
   */
  gap?: 'sm' | 'base' | 'lg';
  /**
   * Use container query for premium 2-col grid
   * @default false
   */
  premium?: boolean;
  /**
   * Use testimonials grid layout (with alternating)
   * @default false
   */
  testimonials?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements (grid items)
   */
  children: React.ReactNode;
}

/**
 * GridLayout Component
 * 
 * Responsive grid system for organizing cards and content.
 * Mobile-first: stacks on mobile, expands to multi-column on larger screens.
 * 
 * @example
 * ```tsx
 * <GridLayout columns={2} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </GridLayout>
 * ```
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  columns = 2,
  gap = 'base',
  premium = false,
  testimonials = false,
  className = '',
  children,
}) => {
  const getGridClasses = () => {
    const classes = ['grid'];
    
    if (premium) {
      classes.push('grid--premium-2col');
    } else if (testimonials) {
      classes.push('grid--testimonials');
    } else {
      classes.push(`grid--cols-${columns}`);
    }
    
    if (gap === 'sm') classes.push('grid--gap-sm');
    if (gap === 'lg') classes.push('grid--gap-lg');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <div className={getGridClasses()}>
      {children}
    </div>
  );
};

GridLayout.displayName = 'GridLayout';
