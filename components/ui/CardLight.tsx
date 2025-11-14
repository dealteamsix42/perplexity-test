import React from 'react';
import '../styles/main.scss';

export interface CardLightProps {
  /**
   * Testimonial quote text
   */
  quote: string;
  /**
   * Author name
   */
  author: string;
  /**
   * Author title/position
   */
  authorTitle?: string;
  /**
   * Company name
   */
  company: string;
  /**
   * Company logo URL
   */
  logo?: string;
  /**
   * Author avatar image URL
   */
  avatar?: string;
  /**
   * Optional metric highlight
   */
  metric?: {
    value: string;
    label: string;
  };
  /**
   * Compact variant (smaller padding)
   * @default false
   */
  compact?: boolean;
  /**
   * Featured variant (highlighted)
   * @default false
   */
  featured?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CardLight Component
 * 
 * Clean testimonial card with light background.
 * Perfect for customer quotes and social proof.
 * 
 * @example
 * ```tsx
 * <CardLight
 *   quote="This platform transformed our workflow completely."
 *   author="Jane Smith"
 *   authorTitle="CTO"
 *   company="TechCorp"
 *   logo="/logos/techcorp.svg"
 *   avatar="/avatars/jane.jpg"
 * />
 * ```
 */
export const CardLight: React.FC<CardLightProps> = ({
  quote,
  author,
  authorTitle,
  company,
  logo,
  avatar,
  metric,
  compact = false,
  featured = false,
  className = '',
}) => {
  const getCardClasses = () => {
    const classes = ['card-light'];
    if (compact) classes.push('card-light--compact');
    if (featured) classes.push('card-light--featured');
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <article className={getCardClasses()}>
      {logo && (
        <div className="card-light__header">
          <img src={logo} alt={`${company} logo`} className="card-light__logo" />
          <span className="card-light__company">{company}</span>
        </div>
      )}

      {metric && (
        <div className="card-light__metric">
          <span className="card-light__metric-value">{metric.value}</span>
          <span className="card-light__metric-label">{metric.label}</span>
        </div>
      )}

      <blockquote className="card-light__quote">{quote}</blockquote>

      <div className="card-light__author">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="card-light__avatar"
          />
        )}
        <div className="card-light__author-info">
          <div className="card-light__author-name">{author}</div>
          {authorTitle && (
            <div className="card-light__author-title">
              {authorTitle}{company && `, ${company}`}
            </div>
          )}
          {!authorTitle && company && (
            <div className="card-light__author-title">{company}</div>
          )}
        </div>
      </div>
    </article>
  );
};

CardLight.displayName = 'CardLight';
