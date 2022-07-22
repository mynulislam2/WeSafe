import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RequireAuth from "./Component/RequireAuth/RequireAuth";
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
import VaccinationForm from "./Pages/VaccinationForm/VaccinationForm";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={
            <RequireAuth>
              <Mainpage></Mainpage>
            </RequireAuth>

          } />
          <Route path="/auth" element={<Authpage></Authpage>} />
          <Route path="/BuildProfile" element={<BuildProfile></BuildProfile>} />
          <Route path="/personalProfile" element={<PersonalProfile></PersonalProfile>} />
          <Route path="/mainpage/:id" element={<Features></Features>} />
          <Route path="mainpage/emergency-contact/emergency-contact-details" element={<EmergencyContactForm></EmergencyContactForm>} />
          <Route path="mainpage/medical-condition/medical-condition-details" element={<MedicalCondiationForm></MedicalCondiationForm>} />
          <Route path="mainpage/medications/medications-details" element={<MedicationsForm></MedicationsForm>} />
          <Route path="mainpage/allergies/allergies-details" element={<AllergyForm></AllergyForm>} />
          <Route path="mainpage/vaccination/vaccination-details" element={<VaccinationForm></VaccinationForm>} />
          <Route path="mainpage/procedures/procedures-details" element={<Procedures></Procedures>} />
          <Route path="mainpage/insurance/insurance-details" element={<InsuranceForm></InsuranceForm>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
