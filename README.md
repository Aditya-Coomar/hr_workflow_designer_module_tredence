# Frontend Template - Next.js

A modern, production-ready Next.js frontend template built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Next.js 16.1.1** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling with PostCSS integration
- **shadcn/ui** component library with Radix UI primitives
- **React Compiler** enabled for performance optimization
- **ESLint** with Next.js configuration for code quality
- **Lucide React** icons
- **Responsive design** utilities and mobile detection hook
- **Hot toast notifications** with react-hot-toast
- **Cookie management** with js-cookie

## 📦 Tech Stack

### Core

- **Next.js** `16.1.1` - React framework with App Router
- **React** `19.2.3` - UI library
- **TypeScript** `^5` - Type safety

### Styling & UI

- **Tailwind CSS** `^4` - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variants
- **tailwind-merge** & **clsx** - Conditional styling utilities

### Development Tools

- **ESLint** `^9` - Code linting
- **Babel React Compiler** - Performance optimization
- **PostCSS** - CSS processing

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Cherry-Network/frontend-template-nextjs.git
   cd frontend-template-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start development server on localhost:3000 |
| `npm run build` | Build the application for production       |
| `npm run start` | Start the production server                |
| `npm run lint`  | Run ESLint to check code quality           |

## 📁 Project Structure

```
frontend-template-nextjs/
├── public/                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       └── tooltip.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── use-mobile.ts  # Mobile detection hook
│   └── lib/
│       └── utils.ts       # Utility functions (cn helper)
├── components.json        # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## ⚙️ Configuration Details

### Next.js Configuration

- **React Compiler**: Enabled for automatic optimization
- **App Router**: Using the new Next.js 13+ routing system
- **TypeScript**: Strict mode enabled with path mapping (`@/*`)

### Tailwind CSS

- **Version**: 4.x (latest)
- **Base Color**: Zinc
- **CSS Variables**: Enabled
- **Style**: New York (shadcn/ui)
- **PostCSS**: Integrated for processing

### shadcn/ui Components

- **Style**: New York
- **RSC**: React Server Components enabled
- **Icon Library**: Lucide React
- **Base Color**: Zinc theme

### ESLint

- Next.js Core Web Vitals rules
- TypeScript support
- Custom ignore patterns for build directories

## 🎨 UI Components

This template includes a comprehensive set of pre-built UI components:

- **Layout**: Card, Separator, Sheet, Sidebar
- **Form**: Input, Select, Button
- **Feedback**: Badge, Skeleton, Tooltip, Dialog
- **Navigation**: Carousel
- **Utility**: Custom hooks for mobile detection

All components are built with:

- **Accessibility** in mind using Radix UI primitives
- **TypeScript** for full type safety
- **Tailwind CSS** for consistent styling
- **Variant support** using Class Variance Authority

## 🚀 Getting Started with Development

1. **Add new pages**: Create files in `src/app/` directory
2. **Add components**: Place reusable components in `src/components/`
3. **Styling**: Use Tailwind CSS classes and the `cn()` utility for conditional styles
4. **Icons**: Import from `lucide-react`
5. **Mobile detection**: Use the `useIsMobile()` hook for responsive behavior

## 📱 Responsive Design

The template includes:

- Mobile detection hook (`useIsMobile`)
- Responsive Tailwind CSS utilities
- Mobile-first design approach
- Breakpoint: 768px for mobile detection

## 🔧 Customization

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Modifying Theme Colors

Edit the CSS variables in `src/app/globals.css` or update the `components.json` configuration.

### TypeScript Paths

The template uses path mapping (`@/*` -> `./src/*`) for cleaner imports.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [shadcn/ui Documentation](https://ui.shadcn.com) - Explore available components
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about utility classes
- [Radix UI Documentation](https://www.radix-ui.com) - Understand component primitives

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:

- Netlify
- Railway
- Heroku
- AWS
- Digital Ocean

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Cherry+ Network Team.
