# MediaMon Frontend

A modern media monitoring dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.

## 🚀 Features

- **Authentication System**: JWT-based login with role-based access control
- **Real-time Analytics**: Live sentiment analysis, trend monitoring, and media insights
- **Interactive Dashboard**: Comprehensive overview with charts and metrics
- **Media Monitoring**: Track articles, engagement, and media outlet performance
- **Search & Explorer**: Advanced search functionality with filters
- **API Integration**: Connected to backend API with fallback to demo data
- **Responsive Design**: Mobile-first design with modern UI components
- **Role-based Access**: Different views for superadmin and client users

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS, Shadcn UI Components
- **State Management**: React Query for API state, Context API for auth
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **API Client**: Axios with interceptors

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medmon-fe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local
echo "NEXT_PUBLIC_API_URL=https://medmon-api.nusarithm.id" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Authentication

### Demo Credentials

- **Email**: admin@nusarithm.id
- **Password**: Password123!
- **Role**: Superadmin (Full Access)

### User Roles

- **Superadmin**: Full access to all features including user management, API testing, and privacy settings
- **Client**: Limited access to analytics, search, and basic settings

## 📊 Dashboard Features

### Main Dashboard
- Total reach and engagement metrics
- Story and post performance analytics
- Real-time activity monitoring
- Audience growth trends

### Sentiment Analytics
- Sentiment distribution (Positive, Neutral, Negative)
- Trend analysis over time
- Source-based sentiment breakdown

### Media Insights
- Top media outlets performance
- Geographic coverage distribution
- Engagement metrics by media type

### Search Explorer
- Advanced search with filters
- Date range selection
- Sentiment and source filtering
- Export capabilities

### Trending Topics
- Real-time trending keywords
- Topic performance metrics
- Historical trend analysis

## 🔧 API Integration

The application is configured to work with the MediaMon API at `https://medmon-api.nusarithm.id`.

### API Endpoints

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Analytics**: `/api/analytics/sentiment`, `/api/analytics/trend`, `/api/analytics/media`
- **Search**: `/api/search`
- **Users**: `/api/users`
- **Health**: `/health`

### Error Handling

The application includes robust error handling:
- Automatic fallback to demo data when API is unavailable
- Loading states for all API calls
- User-friendly error messages
- API status indicators

## 🎨 UI Components

The application uses a custom design system based on Shadcn UI:

- **Color Palette**: Orange/amber theme matching the provided design
- **Components**: Cards, buttons, inputs, badges, progress bars, etc.
- **Charts**: Interactive charts using Recharts library
- **Navigation**: Responsive sidebar with role-based menu items

## 🚀 Deployment

The application is ready for deployment to platforms like Vercel, Netlify, or any static hosting service.

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set the following environment variables in production:

- `NEXT_PUBLIC_API_URL`: URL of the backend API

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets 
- Mobile phones

## 🔒 Security Features

- JWT token management with automatic refresh
- Role-based access control
- Secure API communications
- Privacy settings for data handling

## 🧪 Testing

The application includes an API testing utility available in Settings > API Testing (superadmin only) to verify:
- API connectivity
- Endpoint responses
- Authentication status
- Error handling

## 📈 Performance

- Optimized bundle size with Next.js 15
- Lazy loading of components
- Efficient API caching with React Query
- Responsive images and assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

---

For more information or support, please contact the development team.
