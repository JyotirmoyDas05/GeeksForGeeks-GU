# About Us Page - GSAP Animated Team Hierarchy

## Overview

This implementation creates a modern, animated "About Us" page for the GeeksForGeeks-GU website featuring a comprehensive team hierarchy with GSAP animations. The page showcases all team members across different domains with interactive cards and smooth scroll-triggered animations.

## Features

### 🎯 Team Hierarchy Structure

- **Leadership**: GFG Lead, Technical Lead
- **PR Team**: PR Lead, PR Associate
- **Event Team**: Event Lead, Event Associate
- **Sponsorship & Acquisition**: Lead
- **Graphics & Design Team**: Lead, Co-Lead, Associate
- **Social Media Team**: Lead, Co-Lead
- **DSA**: Lead, Co-Lead
- **DevOps Team**: Lead, Co-Lead
- **Web Dev Team**: Lead, Co-Lead
- **IoT Team**: Lead, Co-Lead
- **AI/ML Team**: Lead, Co-Lead
- **Game Dev Team**: Lead, Co-Lead
- **Creative & Reel Team**: Lead, co-Lead, Associate Lead

### 🎨 GSAP Animations

#### Entrance Animations

- **Hero Section**: Staggered fade-in with upward movement
- **Team Groups**: ScrollTrigger-based entrance with scale and opacity
- **Team Cards**: Staggered card animations within each group

#### Interactive Animations

- **Hover Effects**: Card elevation, scaling, and shadow enhancement
- **Detail Reveal**: Smooth expansion of member details (bio, tech stack, social links)
- **Click Interactions**: Toggle detailed information with smooth transitions

### 📱 Responsive Design

- **Desktop**: Multi-column grid layout with optimal card sizing
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Vertical stack with touch-friendly interactions

### ♿ Accessibility Features

- **Alt Text**: Descriptive image alt attributes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic HTML structure
- **Color Contrast**: High contrast text and background combinations
- **Focus States**: Clear focus indicators for interactive elements

## Technical Implementation

### File Structure

```
components/
├── AboutUsComponent.tsx    # Main About Us page component
lib/
├── teamData.ts            # Team hierarchy data structure
app/
├── about/
    └── page.tsx           # About page route
```

### Key Components

#### 1. TeamCard Component

- Individual member card with photo, title, name, and bio
- GSAP hover animations for elevation and detail reveal
- Responsive design with mobile-first approach
- Click/tap functionality for detail expansion

#### 2. TeamGroupComponent

- Groups related team positions together
- ScrollTrigger animations for entrance effects
- Color-coded group headers
- Staggered card animations

#### 3. AboutUsComponent (Main)

- Hero section with animated introduction
- Team hierarchy rendering
- Call-to-action section
- Smooth scroll integration with ReactLenis

### GSAP Animation Details

#### Entrance Animations

```typescript
// Hero section stagger
gsap.fromTo(
  hero.children,
  {
    opacity: 0,
    y: 50,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
  }
);

// ScrollTrigger for groups
ScrollTrigger.create({
  trigger: element,
  start: "top 85%",
  animation: gsap.fromTo(
    element,
    { opacity: 0, y: 60, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8 }
  ),
});
```

#### Interactive Animations

```typescript
// Hover elevation
gsap.to(card, {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  duration: 0.3,
});

// Detail reveal
gsap.to(details, {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 0.4,
});
```

### Data Structure

The team data is organized in a hierarchical structure:

```typescript
interface TeamMember {
  name: string;
  photo: string;
  bio?: string;
  techStack?: string[];
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface TeamGroup {
  group: string;
  positions: Position[];
  priority: number;
  color?: string;
}
```

## Styling

### Color Scheme

- **Background**: Dark gradient (gray-900 to gray-800)
- **Cards**: Semi-transparent dark with backdrop blur
- **Text**: White headings, gray-300 content, gray-400 secondary
- **Accents**: Color-coded by team group

### Layout

- **Grid System**: CSS Grid with responsive breakpoints
- **Typography**: Mix of system fonts and Broadway-font for headers
- **Spacing**: Consistent padding and margins using Tailwind classes

## Performance Considerations

### Optimization Techniques

- **Image Handling**: UI Avatars API for consistent placeholder images
- **Lazy Loading**: ScrollTrigger ensures animations only run when visible
- **Smooth Scrolling**: ReactLenis for enhanced scroll performance
- **Animation Efficiency**: GSAP's optimized animation engine

### Bundle Size

- **GSAP Plugins**: Only ScrollTrigger plugin loaded
- **Code Splitting**: Component-based architecture for optimal loading
- **Tree Shaking**: Unused GSAP features automatically excluded

## Usage Instructions

### Development

1. Ensure GSAP is installed: `npm install gsap`
2. Import the AboutUsComponent in your page
3. The component is fully self-contained and ready to use

### Customization

1. **Team Data**: Update `lib/teamData.ts` with actual member information
2. **Colors**: Modify group colors in the teamData array
3. **Animations**: Adjust timing and easing in the component
4. **Layout**: Modify grid classes for different responsive behavior

### Adding New Team Members

```typescript
// Add to appropriate team group in teamData.ts
{
  title: "New Position",
  member: {
    name: "Member Name",
    photo: "/team/photo.jpg", // or auto-generated
    bio: "Member biography",
    techStack: ["Tech1", "Tech2"],
    social: {
      linkedin: "https://linkedin.com/in/username"
    }
  }
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation for animations
- **Mobile Browsers**: Touch-optimized interactions
- **Accessibility**: Screen reader compatible

## Future Enhancements

- **Image Upload**: Integration with image management system
- **Dynamic Data**: API integration for real-time team updates
- **Advanced Animations**: 3D transforms and particle effects
- **Search/Filter**: Team member search and role filtering
- **Performance**: Additional optimization for large teams

This implementation provides a solid foundation for a professional, animated team showcase that can be easily extended and customized based on specific requirements.
