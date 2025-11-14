# Component Documentation - Tailark Pro

Complete API reference for all React components in the Tailark Pro Design System.

---

## Table of Contents

1. [Base Components](#base-components)
   - [Container](#container)
   - [Section](#section)
   - [GridLayout](#gridlayout)
   - [CardDark](#carddark)
   - [CardLight](#cardlight)
   - [Button](#button)
   - [Heading](#heading)
   - [Text](#text)
2. [Composite Components](#composite-components)
   - [HeroSection](#herosection)
   - [TestimonialsGrid](#testimonialsgrid)
   - [CaseStudiesGrid](#casestudiesgrid)
   - [MetricsSection](#metricssection)
3. [Accessibility Guidelines](#accessibility-guidelines)
4. [Responsive Behavior](#responsive-behavior)

---

## Base Components

### Container

**Purpose:** Wraps content with max-width and horizontal padding. Centers content on the page.

**Import:**
```tsx
import { Container } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'5xl' \| '7xl' \| 'full' \| 'narrow'` | `'5xl'` | Maximum width variant |
| `noPadding` | `boolean` | `false` | Remove horizontal padding |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Child elements (required) |

**Examples:**
```tsx
// Standard container
<Container>
  <h1>Content goes here</h1>
</Container>

// Narrow container for text-heavy content
<Container maxWidth="narrow">
  <article>...</article>
</Container>

// Full-width container
<Container maxWidth="full" noPadding>
  <div>...</div>
</Container>
```

---

### Section

**Purpose:** Full-width section wrapper with vertical spacing and background options.

**Import:**
```tsx
import { Section } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Section ID for navigation anchors |
| `background` | `'white' \| 'muted' \| 'transparent'` | `'white'` | Background variant |
| `spacing` | `'sm' \| 'base' \| 'lg'` | `'base'` | Vertical spacing variant |
| `noSpacingTop` | `boolean` | `false` | Remove top padding |
| `noSpacingBottom` | `boolean` | `false` | Remove bottom padding |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `children` | `ReactNode` | - | Child elements (required) |

**Examples:**
```tsx
// Standard section
<Section id="features" background="muted">
  <Container>
    <h2>Features</h2>
  </Container>
</Section>

// Large spacing section
<Section spacing="lg">
  <Container>...</Container>
</Section>

// Section without bottom padding
<Section noSpacingBottom>
  <Container>...</Container>
</Section>
```

---

### GridLayout

**Purpose:** Responsive grid system for organizing cards and content.

**Import:**
```tsx
import { GridLayout } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1 \| 2 \| 3 \| 4` | `2` | Number of columns (responsive) |
| `gap` | `'sm' \| 'base' \| 'lg'` | `'base'` | Gap size between grid items |
| `premium` | `boolean` | `false` | Use container query for premium 2-col grid |
| `testimonials` | `boolean` | `false` | Use testimonials grid layout with alternating |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Grid items (required) |

**Examples:**
```tsx
// 2-column grid
<GridLayout columns={2} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</GridLayout>

// 3-column responsive grid
<GridLayout columns={3}>
  {items.map(item => <Card key={item.id} {...item} />)}
</GridLayout>

// Premium case study grid
<GridLayout columns={2} premium>
  <CardDark {...caseStudy1} />
  <CardDark {...caseStudy2} />
</GridLayout>
```

**Responsive Behavior:**
- `columns={2}`: 1 col mobile → 2 cols tablet+
- `columns={3}`: 1 col mobile → 2 cols tablet → 3 cols desktop
- `columns={4}`: 1 col mobile → 2 cols tablet → 4 cols desktop

---

### CardDark

**Purpose:** Premium dark gradient card for case studies and high-impact content.

**Import:**
```tsx
import { CardDark } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | - | Company logo URL |
| `logoAlt` | `string` | `'Company logo'` | Logo alt text |
| `title` | `string` | - | Card title |
| `description` | `string` | - | Card description |
| `metrics` | `CardDarkMetric[]` | - | Array of metrics to display |
| `ctaText` | `string` | - | CTA link text |
| `ctaLink` | `string` | - | CTA link URL |
| `gradient` | `'purple-blue' \| 'teal-navy'` | `'purple-blue'` | Gradient variant |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Custom content |

**Metric Interface:**
```tsx
interface CardDarkMetric {
  label: string;
  value: string;
  accent?: 'teal' | 'purple';
}
```

**Examples:**
```tsx
<CardDark
  logo="/logos/stripe.svg"
  logoAlt="Stripe"
  title="Streaming at Scale"
  description="How Stripe achieved 99.9% uptime with our platform"
  metrics={[
    { label: 'Uptime', value: '99.9%', accent: 'teal' },
    { label: 'Support', value: '24/7' },
    { label: 'Reduction', value: '62%', accent: 'purple' }
  ]}
  ctaText="Read Full Story"
  ctaLink="/case-studies/stripe"
  gradient="purple-blue"
/>
```

---

### CardLight

**Purpose:** Clean testimonial card with light background for customer quotes.

**Import:**
```tsx
import { CardLight } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | - | Testimonial quote text (required) |
| `author` | `string` | - | Author name (required) |
| `authorTitle` | `string` | - | Author title/position |
| `company` | `string` | - | Company name (required) |
| `logo` | `string` | - | Company logo URL |
| `avatar` | `string` | - | Author avatar image URL |
| `metric` | `{ value: string; label: string }` | - | Optional metric highlight |
| `compact` | `boolean` | `false` | Compact variant (smaller padding) |
| `featured` | `boolean` | `false` | Featured variant (highlighted) |
| `className` | `string` | `''` | Additional CSS classes |

**Examples:**
```tsx
<CardLight
  quote="This platform transformed our entire workflow. Deployment is now 65% faster."
  author="Jane Smith"
  authorTitle="CTO"
  company="TechCorp"
  logo="/logos/techcorp.svg"
  avatar="/avatars/jane.jpg"
  metric={{ value: "65%", label: "Faster Deployment" }}
/>

// Compact variant
<CardLight
  quote="Amazing results!"
  author="John Doe"
  company="StartupCo"
  compact
/>

// Featured variant
<CardLight
  quote="Industry-leading platform"
  author="Sarah Johnson"
  company="EnterpriseCo"
  featured
/>
```

---

### Button

**Purpose:** CTA button with multiple variants and sizes.

**Import:**
```tsx
import { Button } from './components/ui';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost'` | `'primary'` | Button variant |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Button size |
| `fullWidth` | `boolean` | `false` | Full width button |
| `iconOnly` | `boolean` | `false` | Icon only button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `(event) => void` | - | Click handler |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `children` | `ReactNode` | - | Button content (required) |

**Examples:**
```tsx
// Primary button
<Button variant="primary" size="lg" onClick={handleClick}>
  Get Started
</Button>

// Secondary button
<Button variant="secondary">
  Learn More
</Button>

// Button with icon
<Button variant="accent">
  <svg>...</svg>
  Download
</Button>

// Full width button
<Button fullWidth>
  Subscribe
</Button>
```

---

## Composite Components

### HeroSection

**Purpose:** Premium hero section with heading, subheading, description, and CTAs.

**Import:**
```tsx
import { HeroSection } from './components/sections';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | - | Hero heading text (required) |
| `subheading` | `string` | - | Hero subheading/tagline |
| `description` | `string` | - | Description text |
| `primaryCta` | `{ text: string; href?: string; onClick?: () => void }` | - | Primary CTA button |
| `secondaryCta` | `{ text: string; href?: string; onClick?: () => void }` | - | Secondary CTA button |
| `background` | `'white' \| 'muted' \| 'transparent'` | `'white'` | Background variant |
| `className` | `string` | `''` | Additional CSS classes |

**Example:**
```tsx
<HeroSection
  heading="Build Better Products Faster"
  subheading="Enterprise-grade platform trusted by industry leaders"
  description="Join thousands of companies using our platform to accelerate development and scale with confidence."
  primaryCta={{
    text: "Start Free Trial",
    href: "/signup"
  }}
  secondaryCta={{
    text: "Watch Demo",
    onClick: () => openVideoModal()
  }}
  background="muted"
/>
```

---

### TestimonialsGrid

**Purpose:** Grid of testimonial cards with optional section header.

**Import:**
```tsx
import { TestimonialsGrid } from './components/sections';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'testimonials'` | Section ID for navigation |
| `heading` | `string` | - | Section heading |
| `subheading` | `string` | - | Section subheading |
| `testimonials` | `CardLightProps[]` | - | Array of testimonials (required) |
| `columns` | `2 \| 3` | `2` | Number of columns |
| `background` | `'white' \| 'muted' \| 'transparent'` | `'muted'` | Background variant |
| `className` | `string` | `''` | Additional CSS classes |

**Example:**
```tsx
<TestimonialsGrid
  heading="What Our Customers Say"
  subheading="Trusted by industry leaders worldwide"
  testimonials={[
    {
      quote: "This platform transformed our workflow.",
      author: "Jane Smith",
      company: "TechCorp",
      logo: "/logos/techcorp.svg"
    },
    // ... more testimonials
  ]}
  columns={2}
/>
```

---

### CaseStudiesGrid

**Purpose:** 2-column grid of premium dark case study cards.

**Import:**
```tsx
import { CaseStudiesGrid } from './components/sections';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'case-studies'` | Section ID for navigation |
| `heading` | `string` | - | Section heading |
| `subheading` | `string` | - | Section subheading |
| `caseStudies` | `CardDarkProps[]` | - | Array of case studies (required) |
| `background` | `'white' \| 'muted' \| 'transparent'` | `'white'` | Background variant |
| `className` | `string` | `''` | Additional CSS classes |

**Example:**
```tsx
<CaseStudiesGrid
  heading="Customer Success Stories"
  subheading="See how industry leaders achieve results with our platform"
  caseStudies={[
    {
      logo: "/logos/stripe.svg",
      title: "Streaming at Scale",
      description: "How Stripe achieved...",
      metrics: [
        { label: "Uptime", value: "99.9%", accent: "teal" }
      ],
      ctaText: "Read Story",
      ctaLink: "/case-studies/stripe"
    },
    // ... more case studies
  ]}
/>
```

---

### MetricsSection

**Purpose:** Grid of metrics/statistics with icons, values, and labels.

**Import:**
```tsx
import { MetricsSection } from './components/sections';
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'metrics'` | Section ID for navigation |
| `heading` | `string` | - | Section heading |
| `subheading` | `string` | - | Section subheading |
| `metrics` | `Metric[]` | - | Array of metrics (required) |
| `columns` | `2 \| 3 \| 4` | `3` | Number of columns |
| `background` | `'white' \| 'muted' \| 'transparent'` | `'white'` | Background variant |
| `className` | `string` | `''` | Additional CSS classes |

**Metric Interface:**
```tsx
interface Metric {
  value: string;          // e.g., "99.9%", "24/7", "10k+"
  label: string;          // e.g., "Uptime Guarantee"
  description?: string;   // Optional description
  icon?: ReactNode;       // Optional icon component
}
```

**Example:**
```tsx
<MetricsSection
  heading="Trusted by Thousands"
  subheading="Industry-leading performance"
  metrics={[
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Industry-leading reliability",
      icon: <ServerIcon />
    },
    {
      value: "24/7",
      label: "Customer Support",
      description: "Always here to help"
    },
    {
      value: "10k+",
      label: "Happy Customers",
      description: "Across 50+ countries"
    }
  ]}
  columns={3}
/>
```

---

## Accessibility Guidelines

All components follow WCAG AAA accessibility standards:

### Semantic HTML
- Components use semantic HTML elements (`section`, `article`, `nav`)
- Proper heading hierarchy (h1 → h6)
- ARIA labels where appropriate

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are visible (2px outline)
- Logical tab order

### Color Contrast
- 7:1 minimum contrast ratio for normal text
- 4.5:1 for large text (18px+ or 14px+ bold)
- Color is never the only indicator

### Touch Targets
- Minimum 44x44px touch areas for mobile
- Adequate spacing between interactive elements

### Screen Readers
- Descriptive alt text for images
- ARIA labels for complex components
- Proper form labels

---

## Responsive Behavior

### Breakpoints

```scss
Mobile:  0px - 639px
SM:      640px - 767px
MD:      768px - 1023px
LG:      1024px - 1279px
XL:      1280px+
```

### Typography Scaling

- **Hero headings:** 2rem mobile → 3rem desktop
- **Body text:** 16px base (doesn't change)
- **Headings:** Progressive scaling with breakpoints

### Grid Behavior

- **2-column grids:** Stack on mobile, 2 columns at 768px+
- **3-column grids:** 1 col mobile → 2 cols tablet → 3 cols desktop
- **4-column grids:** 1 col mobile → 2 cols tablet → 4 cols desktop

### Container Padding

- **Mobile:** 1.5rem (24px) horizontal padding
- **Tablet:** 2rem (32px)
- **Desktop:** 3rem (48px)

### Section Spacing

- **Mobile:** 4rem (64px) vertical padding
- **Tablet:** 5rem (80px)
- **Desktop:** 6rem (96px)

---

## Best Practices

1. **Always use semantic HTML** - Let components handle semantics
2. **Provide alt text** - For all images and logos
3. **Test keyboard navigation** - Ensure all features are accessible
4. **Use proper heading hierarchy** - Don't skip levels
5. **Consider mobile first** - Design for mobile, enhance for desktop
6. **Keep content readable** - Max 60-80 characters per line
7. **Use consistent spacing** - Follow the spacing scale
8. **Test with screen readers** - Verify accessibility
9. **Provide loading states** - For async content
10. **Handle errors gracefully** - Show helpful error messages

---

**For more information, see the main [README.md](../README.md) or [design.json](../design.json) specification.**
