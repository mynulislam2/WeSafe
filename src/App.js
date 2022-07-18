import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Authpage from "./Pages/AuthPage/Authpage";
import BuildProfile from "./Pages/BuildProfile/BuildProfile";
import Mainpage from "./Pages/MainPage/Mainpage";
import PersonalProfile from "./Pages/PersonalProfile/PersonalProfile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="/auth" element={<Authpage></Authpage>} />
          <Route  path="/BuildProfile" element={<BuildProfile></BuildProfile>} />
          <Route  path="/personalProfile" element={<PersonalProfile></PersonalProfile>} />
          <Route  path="/MainPage" element={<Mainpage></Mainpage>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
