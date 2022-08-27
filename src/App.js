import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RequireAuth from "./Component/RequireAuth/RequireAuth";
import AddAnotherProfile from "./Pages/AddAnotherProfile/AddAnotherProfile";
import AllergyForm from "./Pages/AllergyForm/AllergyForm";
import Authpage from "./Pages/AuthPage/Authpage";
import BuildProfile from "./Pages/BuildProfile/BuildProfile";
import EmergencyContactForm from "./Pages/EmergencyContactForm/EmergencyContactForm";
import Features from "./Pages/Features/Features";
import InsuranceForm from "./Pages/InsuranceForm/InsuranceForm";
import Mainpage from "./Pages/MainPage/Mainpage";
import MedicalCondiationForm from "./Pages/MedicalConditonForm/MedicalCondiationForm";
import MedicationsForm from "./Pages/MedicationsForm/MedicationsForm";
import PersonalProfile from "./Pages/PersonalProfile/PersonalProfile";
import Procedures from "./Pages/ProceduresForm/Procedures";
import TakenFeatures from "./Pages/TakenFeatures/TakenFeatures";
import VaccinationForm from "./Pages/VaccinationForm/VaccinationForm";
import React, { useState, useEffect } from 'react';
import InitialImage from '../src/assets/wesafeassets/image/splash_screen_without_text-03.jpg'
import { Fade, Slide } from "react-reveal";

function App() {
  const [spinner, setSpinner] = useState(true);
  const [Switcheduser, setSwitcheduser] = useState("")
  const [Activeusers, setActiveusers] = useState({})

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1500)
  }, []);
  if (spinner) {
    return <Fade>
      <div className="h-screen"><img className="h-screen w-screen" src={InitialImage} alt=""/></div>;
    </Fade>  
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Mainpage setSwitcheduser={setSwitcheduser}Switcheduser={Switcheduser} Activeusers={Activeusers} setActiveusers={setActiveusers}></Mainpage>
            </RequireAuth>

          } />
          <Route path="/auth" element={<Authpage></Authpage>} />
          <Route path="/BuildProfile" element={<BuildProfile></BuildProfile>} />
          <Route path="/personalProfile" element={<PersonalProfile setSwitcheduser={setSwitcheduser}Switcheduser={Switcheduser} Activeusers={Activeusers} setActiveusers={setActiveusers}></PersonalProfile>} />
          <Route path="/addAnotherProfile" element={<AddAnotherProfile setSwitcheduser={setSwitcheduser}Switcheduser={Switcheduser} Activeusers={Activeusers} setActiveusers={setActiveusers}></AddAnotherProfile>} />
          <Route path="/mainpage/:id" element={<Features ></Features>} />
          <Route path="/emergencycont/details" element={<EmergencyContactForm Switcheduser={Switcheduser}></EmergencyContactForm>} />
          <Route path="/mediccond/details" element={<MedicalCondiationForm Switcheduser={Switcheduser}></MedicalCondiationForm>} />
          <Route path="/medications/details" element={<MedicationsForm Switcheduser={Switcheduser}></MedicationsForm>} />
          <Route path="/allergies/details" element={<AllergyForm Switcheduser={Switcheduser}></AllergyForm>} />
          <Route path="/vaccinations/details" element={<VaccinationForm Switcheduser={Switcheduser}></VaccinationForm>} />
          <Route path="/procedures/details" element={<Procedures Switcheduser={Switcheduser}></Procedures>} />
          <Route path="/insurance/details" element={<InsuranceForm Switcheduser={Switcheduser}> </InsuranceForm>} />
          <Route path="/:id" element={<TakenFeatures Switcheduser={Switcheduser}></TakenFeatures>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
