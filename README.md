# GFG-GU Website

A modern, responsive website for GeeksforGeeks Groups at Guwahati University (GFG-GU), built with Next.js 15 and cutting-edge web technologies.

## ✨ Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Performance Optimized**: Built with Next.js 15 and React 19 for optimal performance
- **Smooth Animations**: GSAP-powered animations and text effects
- **Theme Support**: Dark/light theme toggle with next-themes
- **Smooth Scrolling**: Lenis integration for butter-smooth scroll experience
- **Events Section**: Showcase events and activities with an image gallery
- **About Page**: Dedicated section for showcasing community members and group information
- **Contact Information**: Easy-to-find contact details and information

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Runtime**: React 19
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Animations**: [GSAP 3.13](https://gsap.com/) with React integration
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **TypeScript**: Full TypeScript support
- **Analytics**: Vercel Analytics integration

## 📁 Project Structure

```
gdg-gu/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── contact/           # Contact page
│   ├── events/           # Events page
│   └── about/             # about page
├── components/            # Reusable React components
│   ├── Logo.tsx          # Logo component
│   ├── Nav.tsx           # Navigation component
│   ├── PageTransition.tsx # Page transition effects
│   ├── text-animation.tsx # Text animation component
│   ├── theme-provider.tsx # Theme context provider
│   └── ThemeToggle.tsx   # Theme toggle button
├── lib/                  # Utility functions
│   └── utils.ts         # Utility helpers
├── public/              # Static assets
│   ├── fonts/          # Custom fonts (Broadway, DM Mono, Fraunces)
│   └── *.jpg          # Event images
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+ (replaces Node.js & npm/ you should too)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gdg-gu
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Available Scripts

- `bun dev` - Start development server
- `bun run build` - Build production application
- `bun start` - Start production server
- `bun run lint` - Run ESLint for code quality

## 🎨 Customization

### Adding New Pages

Create new pages in the `app/` directory following the App Router convention:

```tsx
// app/new-page/page.tsx
"use client";

import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";

export default function NewPage() {
  return (
    <ReactLenis root>
      <div className="container">
        <div className="page-header">
          <TextAnimation>
            <h1>New Page</h1>
          </TextAnimation>
        </div>
      </div>
    </ReactLenis>
  );
}
```

### Updating Events

Add new images to the `public/` directory and update the events component in `app/events/page.tsx`.

### Theme Customization

Modify the theme configuration in `components/theme-provider.tsx` and update Tailwind CSS classes throughout the application.

## 🌟 Key Components

- **TextAnimation**: GSAP-powered text animations for engaging content presentation
- **Nav**: Main navigation component with responsive design
- **ThemeToggle**: Smooth theme switching with animation
- **PageTransition**: Smooth transitions between pages

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🔧 Performance Features

- **Image Optimization**: Next.js Image component for optimized loading
- **Font Optimization**: Custom fonts loaded efficiently
- **Code Splitting**: Automatic code splitting for faster page loads
- **Analytics**: Built-in performance monitoring with Vercel Analytics

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to a Git repository
2. Import your project to [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Your site will be deployed with a custom domain

### Other Platforms

The site can be deployed to any platform that supports Node.js applications:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GeeksforGeeks](https://www.geeksforgeeks.org/) for inspiration
- [Google Developer Groups](https://developers.google.com/community/gdg) program
- Next.js team for the amazing framework
- All contributors and community members

## 📞 Contact

For questions or support, please reach out through the contact page on the website or create an issue in this repository.

---

Built with ❤️ for the GeeksforGeeks community at Guwahati University.
