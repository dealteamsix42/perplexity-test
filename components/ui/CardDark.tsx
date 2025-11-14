import React from 'react';
import '../styles/main.scss';

export interface CardDarkMetric {
  label: string;
  value: string;
  accent?: 'teal' | 'purple';
}

export interface CardDarkProps {
  /**
   * Company logo URL
   */
  logo?: string;
  /**
   * Logo alt text for accessibility
   */
  logoAlt?: string;
  /**
   * Card title
   */
  title?: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Array of metrics to display
   */
  metrics?: CardDarkMetric[];
  /**
   * CTA link text
   */
  ctaText?: string;
  /**
   * CTA link URL
   */
  ctaLink?: string;
  /**
   * Gradient variant
   * @default 'purple-blue'
   */
  gradient?: 'purple-blue' | 'teal-navy';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements (custom content)
   */
  children?: React.ReactNode;
}

/**
 * CardDark Component
 * 
 * Premium dark gradient card for case studies and high-impact content.
 * Features gradient background, metrics display, and hover effects.
 * 
 * @example
 * ```tsx
 * <CardDark
 *   logo="/logos/company.svg"
 *   logoAlt="Company Name"
 *   title="Case Study"
 *   description="How we helped..."
 *   metrics={[
 *     { label: 'Uptime', value: '99.9%', accent: 'teal' },
 *     { label: 'Support', value: '24/7' }
 *   ]}
 *   ctaText="Read Story"
 *   ctaLink="/case-studies/company"
 * />
 * ```
 */
export const CardDark: React.FC<CardDarkProps> = ({
  logo,
  logoAlt = 'Company logo',
  title,
  description,
  metrics,
  ctaText,
  ctaLink,
  gradient = 'purple-blue',
  className = '',
  children,
}) => {
  const getCardClasses = () => {
    const classes = ['card-dark'];
    if (gradient === 'teal-navy') classes.push('card-dark--gradient-teal');
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <article className={getCardClasses()}>
      {logo && (
        <img
          src={logo}
          alt={logoAlt}
          className="card-dark__logo"
        />
      )}

      {(title || description) && (
        <div className="card-dark__content">
          {title && <h3 className="card-dark__title">{title}</h3>}
          {description && <p className="card-dark__description">{description}</p>}
        </div>
      )}

      {children}

      {metrics && metrics.length > 0 && (
        <div className="card-dark__metrics">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`card-dark__metric ${
                metric.accent === 'purple' ? 'card-dark__metric--accent-purple' : ''
              }`}
            >
              <div className="card-dark__metric-value">{metric.value}</div>
              <div className="card-dark__metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {ctaText && (
        <a href={ctaLink || '#'} className="card-dark__cta">
          {ctaText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </article>
  );
};

CardDark.displayName = 'CardDark';
