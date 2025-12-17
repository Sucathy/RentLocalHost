import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Aboutus from "./Components/Home/Fotter/Aboutus/Aboutus";
import HostHome from "./Components/Home/HostHome";
import Profile from "./Components/Home/Menubar/Profile/Profile";
import Support from "./Components/Home/Menubar/Support/Support";

import Forgot from "./Components/Login/Forgot";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";

import HostListingEdit from "./Components/HostHomeLand/HostListing/HostListingEdit";

import AccountSetting from "./Components/Home/Menubar/AccountSettings/AccountSetting";
import HostListingLayout from "./Components/HostListingForm/HostListingLayout";
import Step1PropertyType from "./Components/HostListingForm/Step1PropertyType";
import Step2Price from "./Components/HostListingForm/Step2price";
import Step3RoomType from "./Components/HostListingForm/Step3RoomType";
import Step4Location from "./Components/HostListingForm/Step4Location";
import Step5Details from "./Components/HostListingForm/Step5Details";
import Step6Images from "./Components/HostListingForm/Step6Images";
import Step7Title from "./Components/HostListingForm/Step7Title";
import Step8Map from "./Components/HostListingForm/Step8Map";
import Step9Amenities from "./Components/HostListingForm/Step9Amenities";
import StepBHKType from "./Components/HostListingForm/StepBHkType";
import StepPgType from "./Components/HostListingForm/StepPgType";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HostHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/accountsetting" element={<AccountSetting />} />


          <Route path="/support" element={<Support />} />
          <Route path="/aboutus" element={<Aboutus />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />


          <Route path="edit-listing/:id" element={<HostListingEdit />} />


          <Route path="/host" element={<HostListingLayout />}>

            {/* Nested Steps */}
            <Route path="property-type" element={<Step1PropertyType />} />
            <Route path="pgtype" element={<StepPgType />} />
            <Route path="bhktype" element={<StepBHKType />} />
            <Route path="room-type" element={<Step3RoomType />} />
            <Route path="location" element={<Step4Location />} />
            <Route path="map" element={<Step8Map />} />
            <Route path="details" element={<Step5Details />} />
            <Route path="images" element={<Step6Images />} />
            <Route path="price" element={<Step2Price />} />
            <Route path="title" element={<Step7Title />} />
            <Route path="amenities" element={<Step9Amenities />} />


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
