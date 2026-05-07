import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SearchPage from '@/pages/SearchPage'
import PlaceDetailPage from '@/pages/PlaceDetailPage'
import ProfilePage from '@/pages/ProfilePage'
import VolunteerPage from '@/pages/VolunteerPage'
import CommunityPage from '@/pages/CommunityPage'
import DonationPage from '@/pages/DonationPage'
import MediaHubPage from '@/pages/MediaHubPage'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAppStore()
  return isAuthenticated ? element : <Navigate to="/login" />
}

export default function App() {
  const { isDarkMode } = useAppStore()

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="flex flex-col min-h-screen bg-surface text-on-surface transition-colors">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/place/:id" element={<PlaceDetailPage />} />
              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
              <Route path="/volunteer" element={<ProtectedRoute element={<VolunteerPage />} />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/media" element={<MediaHubPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}
