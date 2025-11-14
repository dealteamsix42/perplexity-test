import React from 'react';
import '../styles/main.scss';

export interface SectionProps {
  /**
   * Section ID for navigation anchors
   */
  id?: string;
  /**
   * Background variant
   * @default 'white'
   */
  background?: 'white' | 'muted' | 'transparent';
  /**
   * Vertical spacing variant
   * @default 'base'
   */
  spacing?: 'sm' | 'base' | 'lg';
  /**
   * Remove top padding
   * @default false
   */
  noSpacingTop?: boolean;
  /**
   * Remove bottom padding
   * @default false
   */
  noSpacingBottom?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * Child elements
   */
  children: React.ReactNode;
}

/**
 * Section Component
 * 
 * Full-width section wrapper with vertical spacing and background options.
 * Use for major page sections.
 * 
 * @example
 * ```tsx
 * <Section id="testimonials" background="muted">
 *   <Container>
 *     <h2>Customer Testimonials</h2>
 *   </Container>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  id,
  background = 'white',
  spacing = 'base',
  noSpacingTop = false,
  noSpacingBottom = false,
  className = '',
  ariaLabel,
  children,
}) => {
  const getSectionClasses = () => {
    const classes = ['section'];
    
    if (background === 'muted') classes.push('section--bg-muted');
    if (background === 'transparent') classes.push('section--bg-transparent');
    if (spacing === 'sm') classes.push('section--spacing-sm');
    if (spacing === 'lg') classes.push('section--spacing-lg');
    if (noSpacingTop) classes.push('section--no-spacing-top');
    if (noSpacingBottom) classes.push('section--no-spacing-bottom');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <section
      id={id}
      className={getSectionClasses()}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
};

Section.displayName = 'Section';
