import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SearchPage from '@/pages/SearchPage';
import PlaceDetailPage from '@/pages/PlaceDetailPage';
import ProfilePage from '@/pages/ProfilePage';
import VolunteerPage from '@/pages/VolunteerPage';
import CommunityPage from '@/pages/CommunityPage';
import DonationPage from '@/pages/DonationPage';
import MediaHubPage from '@/pages/MediaHubPage';
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAppStore();
    return isAuthenticated ? element : _jsx(Navigate, { to: "/login" });
};
export default function App() {
    const { isDarkMode } = useAppStore();
    return (_jsx(Router, { children: _jsx("div", { className: isDarkMode ? 'dark' : '', children: _jsxs("div", { className: "flex flex-col min-h-screen bg-surface text-on-surface transition-colors", children: [_jsx(Navigation, {}), _jsx("main", { className: "flex-grow", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/search", element: _jsx(SearchPage, {}) }), _jsx(Route, { path: "/place/:id", element: _jsx(PlaceDetailPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { element: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/volunteer", element: _jsx(ProtectedRoute, { element: _jsx(VolunteerPage, {}) }) }), _jsx(Route, { path: "/community", element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: "/donate", element: _jsx(DonationPage, {}) }), _jsx(Route, { path: "/media", element: _jsx(MediaHubPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }), _jsx(Footer, {})] }) }) }));
}
