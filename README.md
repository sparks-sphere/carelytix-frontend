# EliteSalon - Salon Management Platform

A modern, full-stack salon management platform built with Next.js 13+ and TypeScript.

## 🚀 Features

- **Static Site Generation (SSG)** - Optimized for performance and SEO
- **Client-side Rendering** - Interactive forms and dynamic content
- **Responsive Design** - Works on all devices
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- **TypeScript** - Type-safe development
- **Authentication Ready** - Sign in/sign up pages included

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd carelytix
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🔧 Static Export Configuration

This project is configured for **Static Site Generation (SSG)** with the following setup:

### Next.js Configuration (`next.config.js`)
- `output: 'export'` - Enables static export
- Optimized for static file generation
- Configured for Netlify deployment

### Page Types

**Static Pages (SSG):**
- `/` - Home page with interactive elements
- `/about` - Static content, pre-rendered
- `/features` - Feature showcase, pre-rendered  
- `/pricing` - Pricing plans, pre-rendered
- `/signin` - Authentication form (client-side)
- `/signup` - Registration form (client-side)

## 🚀 Deployment Options

### 1. Netlify (Recommended for Static Sites)

```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `out`
- Automatic deployment from Git

### 2. Vercel (Recommended for Full SSR)

```bash
npm install -g vercel
vercel
```

### 3. Railway

```bash
# Connect your GitHub repository
# Railway will automatically detect Next.js
```

### 4. DigitalOcean App Platform

```bash
# Connect repository
# Set build command: npm run build
# Set run command: npm start
```

## 📁 Project Structure

```
carelytix/
├── app/                    # Next.js App Router
│   ├── about/             # About page (SSG)
│   ├── features/          # Features page (SSG)
│   ├── pricing/           # Pricing page (SSG)
│   ├── signin/            # Sign in page (Client)
│   ├── signup/            # Sign up page (Client)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (Client)
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── out/                  # Static export files
└── public/               # Static assets
```

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Edit component styles in `components/ui/`

### Content
- Update metadata in each page's `metadata` export
- Modify page content in respective `page.tsx` files
- Update navigation links in the layout

## 🔍 SEO & Performance

- **Static Site Generation**: All pages are pre-built for better SEO
- **Metadata**: Each page has proper meta tags
- **Performance**: Optimized with Next.js built-in optimizations
- **Accessibility**: Built with accessibility in mind

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates `out/` directory)
- `npm start` - Start production server (serves `out/` directory)
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This project is configured for static export (SSG) and works perfectly with Netlify. For full SSR capabilities, consider using Vercel.