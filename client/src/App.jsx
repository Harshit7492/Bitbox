import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Make sure to import BrowserRouter as Routerimport './App.css';
import LoadingBar from 'react-top-loading-bar'
import About from './component/About';
import Alert from './component/Alert';
import Footer from './component/Footer';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import ProjectState from './context/ProjectState';
import ProfileState from './context/ProfileState';
import CodeOfConduct from './component/Footers/Codeofconduct';
import Feedback from './component/Footers/Feedback';
import ContactUs from './component/Footers/Contactus';
import PrivacyPolicy from './component/Footers/Privacypolicy';
import TermOfUse from './component/Footers/TermOfUse';
import Community from './component/Community';
import MyProfile from './component/MyProfile'
import ScrollTop from './component/ScrollTop';
import EditProfile from './component/EditProfile';
import Contributers from './component/Contributers';
import Discussion from './component/Discussion'

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Define routes where the footer should not be shown
  const hideFooterRoutes = ['/login', '/signup'];

  // Toggle Dark Mode
  
  // Retrieve mode default to 'light'
  const [mode, setMode] = useState('light');

  // Effect to update local storage when mode changes
  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');

      // Set background color to dark mode
      document.body.style.backgroundColor = 'black';

      // Set text color to white for all elements
      document.querySelectorAll('*').forEach(element => {
        element.style.color = 'white';
      });

      // Show alert for dark mode enabled
      showAlert("Dark Mode Enabled", "success");
    }
    else {
      setMode('light');
      // Set background color to light mode
      document.body.style.backgroundColor = 'white';
      // Reset text color for all elements to default
      document.querySelectorAll('*').forEach(element => {
        element.style.color = ''; // Reset to default
      });
      // Show alert for light mode enabled
      showAlert("Light Mode Enabled", "success");
    }
  }

  // Loading Bar
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <ProjectState>
        <ProfileState>
          <Router>
            {/* Navbar */}
            <div className="content">
              <Navbar title="Bitbox" home="Home" community="Community" about="About us" myProjects="My projects" discussion="Discussion" mode={mode} setProgress={setProgress}
                toggleMode={toggleMode} showAlert={showAlert} />
            </div>
            <LoadingBar
              color='blue'
              progress={100}
              setProgressprogress={progress}
              onLoaderFinished={() => setProgress(0)}
            />
            <div className="First-Bc">
              <div className="alert-container">
                <Alert alert={alert} />
              </div>
              <ScrollTop />
              <Routes>
                <Route exact path="/" element={<Home mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/discussion" element={<Discussion mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/community" element={<Community mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/about" element={<About mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/myprofile" element={<MyProfile mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/editprofile" element={<EditProfile mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/contibuters" element={<Contributers mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/login" element={<Login mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                {/* Footer */}
                <Route exact path="/codeofconduct" element={<CodeOfConduct mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/feedback" element={<Feedback mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/contactus" element={<ContactUs mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/privacypolicy" element={<PrivacyPolicy mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/termofuse" element={<TermOfUse mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              </Routes>
            </div>
            {/* Conditionally render the footer based on the current route */}
            {!hideFooterRoutes.includes(window.location.pathname) && <Footer mode={mode} setProgress={setProgress}
              setAlert={showAlert} />}
          </Router>
        </ProfileState>
      </ProjectState>
    </div>
  );
}

export default App;
