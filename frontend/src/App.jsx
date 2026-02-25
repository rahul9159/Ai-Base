import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Integrations from './pages/resources/Integrations';
import Changelog from './pages/resources/Changelog';
import About from './pages/company/About';
import Careers from './pages/company/Careers';
import Blog from './pages/resources/Blog';
import Contact from './pages/company/Contact';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Security from './pages/legal/Security';
import Documentation from './pages/resources/Documentation';
import APIReference from './pages/resources/APIReference';
import Tutorials from './pages/resources/Tutorials';
import Community from './pages/resources/Community';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AIChatbot from './pages/solutions/AIChatbot';
import VoiceAssistant from './pages/solutions/VoiceAssistant';
import VideoGeneration from './pages/solutions/VideoGeneration';
import ImageGeneration from './pages/solutions/ImageGeneration';
import ImageGeneratorStudio from './pages/solutions/ImageGeneratorStudio';
import LogoMaker from './pages/solutions/LogoMaker';
import ChatPage from './pages/solutions/ChatPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';
import { getStoredUser, isAuthenticated, resolveUserHomeRoute } from './lib/auth';

function ChatLayout({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {children}
    </div>
  );
}

function PublicOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to={resolveUserHomeRoute(getStoredUser())} replace />;
  }
  return children;
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans antialiased">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />

          <Route path="/integrations" element={
            <>
              <Navbar />
              <Integrations />
              <Footer />
            </>
          } />

          <Route path="/changelog" element={
            <>
              <Navbar />
              <Changelog />
              <Footer />
            </>
          } />

          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />

          {/* ✅ ALL OTHER NORMAL PAGES - Same pattern */}
          <Route path="/careers" element={
            <>
              <Navbar />
              <Careers />
              <Footer />
            </>
          } />

          <Route path="/blog" element={
            <>
              <Navbar />
              <Blog />
              <Footer />
            </>
          } />

          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />

          <Route path="/privacy" element={
            <>
              <Navbar />
              <Privacy />
              <Footer />
            </>
          } />

          <Route path="/terms" element={
            <>
              <Navbar />
              <Terms />
              <Footer />
            </>
          } />

          <Route path="/security" element={
            <>
              <Navbar />
              <Security />
              <Footer />
            </>
          } />

          <Route path="/docs" element={
            <>
              <Navbar />
              <Documentation />
              <Footer />
            </>
          } />

          <Route path="/api" element={
            <>
              <Navbar />
              <APIReference />
              <Footer />
            </>
          } />

          <Route path="/tutorials" element={
            <>
              <Navbar />
              <Tutorials />
              <Footer />
            </>
          } />

          <Route path="/community" element={
            <>
              <Navbar />
              <Community />
              <Footer />
            </>
          } />

          <Route path="/signin" element={
            <>
              <Navbar />
              <PublicOnlyRoute>
                <SignIn />
              </PublicOnlyRoute>
              <Footer />
            </>
          } />

          <Route path="/signup" element={
            <>
              <Navbar />
              <PublicOnlyRoute>
                <SignUp />
              </PublicOnlyRoute>
              <Footer />
            </>
          } />

          <Route path="/dashboard" element={
            <>
              
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              
            </>
          } />

          <Route path="/profile" element={
            <>
             
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </>
          } />

          {/* ✅ SOLUTIONS PAGES - NO Navbar/Footer EXCEPT Chat */}
          <Route path="/solutions/chatbot" element={
            <>
              <AIChatbot />
            </>
          } />

          <Route path="/solutions/voice" element={
            <>
              <VoiceAssistant />
            </>
          } />

          <Route path="/solutions/video" element={
            <>
              <VideoGeneration />
            </>
          } />

          <Route path="/solutions/image" element={
            <>
              <Navbar />
              <ImageGeneration />
              <Footer />
            </>
          } />

          <Route path="/solutions/image/create" element={
            <>
              
              <ImageGeneratorStudio />
              
            </>
          } />

          <Route path="/solutions/logo" element={
            <>
              <LogoMaker />
            </>
          } />

          <Route path="/solutions/chat" element={
            <ProtectedRoute>
              <ChatLayout>
                <ChatPage />
              </ChatLayout>
            </ProtectedRoute>
          } />

        </Routes>
        <ScrollProgress />
      </div>
    </Router>
  );
}
export default App;
