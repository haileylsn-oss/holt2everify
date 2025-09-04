import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "animate.css";
import AdminPage from "./pages/admin";
import UserPage from "./pages/user";
// import ChallengePage from "./pages/cloudflare";
import VerifyPage from "./pages/Home/verify";
import Home from "./pages/Home/home";
import ApplyForm from "./pages/apply";
import { useEffect } from 'react';
import { database, ref, onValue } from './firebase';
import LandingPagee from "./pages/LandingPage";
import UserPage2 from "./pages/user2";
import UserPage3 from "./pages/user3";

const App: React.FC = () => {

  useEffect(() => {
    const refreshRef = ref(database, 'admin/refresh');

    onValue(refreshRef, (snapshot) => {
      const shouldRefresh = snapshot.val();
      if (shouldRefresh === true) {
        window.location.reload();
      }
    });
  }, []);

  

  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/" element={<VerifyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user2" element={<UserPage2 />} />
          <Route path="/user3" element={<UserPage3 />} />
          <Route path="/waiting" element={<LandingPagee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
