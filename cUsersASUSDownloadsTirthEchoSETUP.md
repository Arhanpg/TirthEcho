# TirthEcho Frontend - Setup Guide

## Project Initialization Complete ✅

The complete frontend for TirthEcho has been created with a modern React + TypeScript stack.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your API URL:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

## What's Included

### ✅ Completed Features

#### Pages (9 pages)
- **HomePage** - Hero section, categories, featured places, stats, hierarchy
- **LoginPage** - Multi-auth (OTP, Email, Social)
- **SearchPage** - Advanced filters, sorting, pagination
- **PlaceDetailPage** - Full place information, gallery, map, contact
- **ProfilePage** - User dashboard, statistics, edit profile
- **VolunteerPage** - Dashboard, data submission, community
- **CommunityPage** - Feed, posts, events, trending
- **DonationPage** - Tiers, custom amounts, impact metrics
- **MediaHubPage** - Gallery, categories, upload section

#### Components
- Navigation bar with user menu and theme toggle
- Footer with links
- PlaceCard component for displaying places
- MaterialIcon wrapper for Google Material Icons

#### Services & State Management
- Complete API service layer with Axios
- Zustand store for global state
- Custom React hooks for common operations

#### Design System
- Tailwind CSS with custom theme
- Material Design colors
- Responsive breakpoints
- Light/Dark mode support
- Accessible components

### 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx         # Main header
│   ├── Footer.tsx             # Footer
│   ├── PlaceCard.tsx          # Place display card
│   └── MaterialIcon.tsx       # Icon component
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SearchPage.tsx
│   ├── PlaceDetailPage.tsx
│   ├── ProfilePage.tsx
│   ├── VolunteerPage.tsx
│   ├── CommunityPage.tsx
│   ├── DonationPage.tsx
│   └── MediaHubPage.tsx
├── services/
│   └── api.ts                 # API client & endpoints
├── stores/
│   └── appStore.ts            # Zustand store
├── hooks/
│   └── index.ts               # Custom hooks
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   └── helpers.ts             # Utility functions
├── App.tsx                    # Main component with routing
├── main.tsx                   # React entry point
└── index.css                  # Global styles
```

## Available Scripts

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
npm run lint         # ESLint checking
```

## Configuration Files

### Tailwind Configuration
- `tailwind.config.js` - Custom theme with Jain heritage design system
- `postcss.config.js` - PostCSS configuration

### TypeScript Configuration
- `tsconfig.json` - Main TypeScript config
- `tsconfig.node.json` - Node-specific config

### Vite Configuration
- `vite.config.ts` - Vite build configuration with path aliases

### Environment
- `.env.example` - Example environment variables
- Create `.env.local` for local development

## Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Client routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Material Symbols** - Icons

## Design System Features

### Colors
- Primary: #526069 (slate blue)
- Surface colors for elevation
- Error, Success states
- Light/Dark mode support

### Typography
- Inter font family
- Hierarchical sizes (h1, h2, h3)
- Body and label variants
- Consistent line heights

### Components
- Buttons (primary, secondary)
- Form inputs
- Cards and containers
- Navigation elements
- Status badges

### Spacing
- 8px base unit
- Consistent scales (xs, sm, md, lg, xl)
- Utility classes for margins and padding

## API Integration

The frontend connects to backend endpoints:

```
Authentication:    /auth/*
Places:           /places/*
Users:            /users/*
Donations:        /donations/*
Community:        /community/*
Volunteer:        /volunteer/*
```

See `src/services/api.ts` for full documentation.

## State Management

Global state managed with Zustand:
- User authentication
- Theme preferences
- Search filters
- Favorite places
- Application state

Accessed via custom hooks:
- `useAuth()` - Authentication
- `useTheme()` - Theme
- `useSearch()` - Search filters
- `useFavorites()` - Favorites

## Next Steps

1. **Connect Backend**: Update `VITE_API_URL` in `.env.local` with your backend URL
2. **Start Frontend**: Run `npm run dev`
3. **Test Pages**: Navigate through all pages to verify layout
4. **Customize**: Modify colors, fonts, and layouts as needed
5. **Add Features**: Build on existing components

## Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions  
- Safari: Latest 2 versions
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimization

The project is optimized for:
- Fast initial load
- Smooth interactions
- Efficient state updates
- Code splitting with routes
- Responsive images

## Accessibility

Features included:
- Semantic HTML structure
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## Development Workflow

1. Create feature branch
2. Make changes in component/page files
3. Test in browser (`npm run dev`)
4. Type check: `npm run type-check`
5. Lint: `npm run lint`
6. Build: `npm run build`
7. Deploy production build

## Troubleshooting

### Port 3000 already in use
Edit `vite.config.ts` to change port:
```typescript
server: {
  port: 3001,
}
```

### API connection fails
- Check backend is running
- Verify `VITE_API_URL` is correct
- Check browser console for CORS errors
- Ensure backend has CORS configured

### Styling not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server: `npm run dev`
- Check Tailwind classes are valid

## Production Deployment

1. Build for production: `npm run build`
2. Output in `dist/` directory
3. Deploy to hosting service (Vercel, Netlify, AWS, etc.)
4. Set production environment variables
5. Configure backend API URL for production

## Support & Resources

- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com
- Zustand: https://github.com/pmndrs/zustand

---

**Frontend development ready! 🚀**

For more information, see README.md
