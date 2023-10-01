import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from "./Login.js";
import HomePage from "./HomePage.js";
import EditUser from './EditUser.js';
import PersonalArea from './PersonalArea';
import AddAd from './AddAd';
import Date from './Date';
import TryValid from './TryValid';
// import FullFeaturedCrudGrid from './FullFeaturedCrudGrid'


const App = () => (
  <BrowserRouter>
    <Routes>
<Route path="/login" element={<Login/>}/>  
<Route path="/PersonalArea" element={<PersonalArea/>}/>
<Route path="/" element={<HomePage/>}/>  
<Route path="/AddAd" element={<AddAd/>}/>
<Route path="/Date" element={<Date/>}/>
<Route path="/TryValid" element={<TryValid/>}/>
<Route path="/editUser" element={<EditUser/>}>

  
</Route>
    </Routes>
  </BrowserRouter>
)

export default App;
