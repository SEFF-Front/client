import React from "react";
import Maininfo from "./Cvcomponent/Main";
import { Route, Routes } from "react-router-dom";
import Cvabout from "./Cvcomponent/Cvabout";
import Cvskills from "./Cvcomponent/Skills";
import CvExperience from "./Cvcomponent/Experience";
import Honersandawards from "./Cvcomponent/Honersandawards";
import Cveducation from "./Cvcomponent/Education";
import Hobbiesandinterests from "./Cvcomponent/Hobbiesandinterests";
import Cvlinks from "./Cvcomponent/Cvlinks";
function Cvcomponent() {
    return (
      <>
      <Routes>
    <Route path='/createcv' element={<Maininfo/>}/>
    <Route path='/cvabout' element={<Cvabout/>}/>
    <Route path='/cvskills' element={<Cvskills/>}/>
    <Route path='/experience' element={<CvExperience/>}/>
    <Route path='/cveducation' element={<Cveducation/>}/>
    <Route path='/honersandawards' element={<Honersandawards/>}/>
    <Route path='/hobbiesandinterests' element={<Hobbiesandinterests/>}/>
    <Route path='/cvlinks' element={<Cvlinks/>}/>







      </Routes>
      </>
    );
  }
  export default Cvcomponent;