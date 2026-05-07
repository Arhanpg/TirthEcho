import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { authService } from '@/services/api'
import MaterialIcon from '@/components/MaterialIcon'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'otp' | 'email'>('otp')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      await authService.sendOtp(phone)
      // Show success message
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLoginWithOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const { user } = await authService.login(phone, otp)
      setUser(user)
      navigate('/')
    } catch (err) {
      setError('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Side: Teaser Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="absolute inset-0 p-xl flex flex-col justify-end bg-gradient-to-t from-surface/80 to-transparent">
          <div className="max-w-md">
            <h2 className="font-h2 text-h2 text-on-surface mb-sm">Welcome to TirthEcho</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Access your community dashboard, manage volunteers, and track analytics in a serene, focused environment.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-lg sm:p-xl bg-background relative">
        {/* Back Button */}
        <div className="absolute top-lg left-lg">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm"
          >
            <MaterialIcon name="arrow_back" size={18} />
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-sm flex flex-col gap-xl">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-primary mb-md">
              <MaterialIcon name="eco" size={28} filled />
            </div>
            <h1 className="font-h1 text-h1 text-primary mb-xs">Log In</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Continue to your TirthEcho account</p>
          </div>

          {/* Login Type Tabs */}
          <div className="flex p-xs bg-surface-container-low rounded-xl border border-outline-variant">
            <button
              onClick={() => setActiveTab('otp')}
              className={`flex-1 py-sm rounded-lg transition-all flex justify-center items-center gap-xs font-label-sm text-label-sm ${
                activeTab === 'otp'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/50'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <MaterialIcon name="smartphone" size={16} />
              Mobile OTP
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-sm rounded-lg transition-all flex justify-center items-center gap-xs font-label-sm text-label-sm ${
                activeTab === 'email'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/50'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <MaterialIcon name="mail" size={16} />
              Email
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="p-md bg-error-container text-on-error-container rounded-lg font-body-md text-body-md">{error}</div>}

          {/* OTP Form */}
          {activeTab === 'otp' && (
            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex rounded-lg border border-outline-variant overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow bg-surface-container-lowest">
                  <select className="border-none bg-transparent py-base pl-md pr-sm font-body-md text-body-md text-on-surface focus:ring-0 cursor-pointer border-r border-outline-variant">
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    className="flex-1 border-none bg-transparent px-md py-base font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0"
                    id="phone"
                    placeholder="000-000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading || !phone}
                className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-sm text-label-sm flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>

              {otp && (
                <>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-sm text-label-sm text-on-surface-variant">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="input-base text-center text-2xl tracking-widest"
                    />
                  </div>
                  <button
                    onClick={handleLoginWithOtp}
                    disabled={loading || !otp}
                    className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-sm text-label-sm flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Email Form */}
          {activeTab === 'email' && (
            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Email Address</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-base" />
              </div>
              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Password</label>
                  <a href="#" className="font-label-sm text-label-sm text-primary hover:underline">
                    Forgot?
                  </a>
                </div>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-base" />
              </div>
              <button className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-sm text-label-sm flex items-center justify-center hover:bg-primary-fixed transition-colors">
                Log In
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-md">
            <div className="h-px flex-1 bg-outline-variant"></div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Or continue with</span>
            <div className="h-px flex-1 bg-outline-variant"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-sm">
            <button className="w-full h-12 border border-outline-variant bg-surface-container-lowest text-on-surface rounded-xl font-label-sm text-label-sm flex items-center justify-center gap-md hover:bg-surface-container-low transition-colors">
              <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.78 15.74 17.55V20.35H19.31C21.4 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"></path>
                <path d="M12 23C14.97 23 17.46 22.02 19.31 20.35L15.74 17.55C14.74 18.22 13.48 18.63 12 18.63C9.13 18.63 6.69 16.69 5.8 14.08H2.12V16.94C3.94 20.55 7.66 23 12 23Z" fill="#34A853"></path>
                <path d="M5.8 14.08C5.57 13.4 5.44 12.71 5.44 12C5.44 11.29 5.57 10.6 5.8 9.92V7.06H2.12C1.37 8.55 0.94 10.22 0.94 12C0.94 13.78 1.37 15.45 2.12 16.94L5.8 14.08Z" fill="#FBBC05"></path>
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.39 3.83C17.45 2.03 14.96 1 12 1C7.66 1 3.94 3.45 2.12 7.06L5.8 9.92C6.69 7.31 9.13 5.38 12 5.38Z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="w-full h-12 border border-outline-variant bg-surface-container-lowest text-on-surface rounded-xl font-label-sm text-label-sm flex items-center justify-center gap-md hover:bg-surface-container-low transition-colors">
              <MaterialIcon name="apple" size={18} />
              Apple
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-sm">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don't have an account?{' '}
              <a href="#" className="text-primary font-label-sm text-label-sm hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
