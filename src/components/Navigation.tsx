import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '@/hooks'
import MaterialIcon from './MaterialIcon'

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface transition-all duration-200">
      <div className="flex justify-between items-center w-full px-lg py-md max-w-7xl mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-md">
          <span className="font-h2 text-h2 font-bold text-primary">e-Shraman jainism</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-lg">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            Home
          </Link>
          <Link to="/search" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            Map
          </Link>
          <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            Community
          </Link>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            History
          </a>
          <Link to="/donate" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            Donate
          </Link>
          <Link to="/volunteer" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
            Volunteer
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm text-on-surface-variant">
            <button className="p-sm hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center">
              <MaterialIcon name="language" />
            </button>
            <button onClick={toggleDarkMode} className="p-sm hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center">
              <MaterialIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} />
            </button>
            <button className="p-sm hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center">
              <MaterialIcon name="notifications" />
            </button>
            <button className="p-sm hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center">
              <MaterialIcon name="account_circle" />
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-sm ml-sm border-l border-outline-variant pl-md">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="font-body-md text-body-md text-on-surface-variant hover:text-primary px-md py-sm transition-colors">
                  {user?.name || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="font-body-md text-body-md bg-error text-on-error hover:opacity-90 px-md py-sm rounded transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-body-md text-body-md text-on-surface-variant hover:text-primary px-md py-sm transition-colors">
                  Login
                </Link>
                <Link to="/login" className="font-body-md text-body-md bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed px-md py-sm rounded transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
