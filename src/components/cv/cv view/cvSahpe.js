import { useRef, useState } from 'react';
import './cvShape.css'
import 'bootstrap/dist/css/bootstrap.css';
import CvDesign from '../cv style shape/cvdesign';
import Cvskills from '../cv sections/Skills';
import Honersandawards from '../cv sections/Honersandawards';
import Hobbiesandinterests from '../cv sections/Hobbiesandinterests';
import CvExperience from '../cv sections/Experience';
import Cvlinks from '../cv sections/Cvlinks';
import Maininfo from '../cv sections/Main';
import Cvabout from '../cv sections/Cvabout';
import Cveducation from '../cv sections/Education';
import Title from '../../title/title';
import Footer from '../../footer/Footer';
function CvShape(){
    const containerSteps = useRef(null)
    const currentStep = 1;
    const [formstepnum , setFormstepnum] = useState(0);
    const [nextBtn , setNextBtn] =useState("continue")

    const handleNext = ()=>{
        setFormstepnum((prevStep) => prevStep + 1);
        if (containerSteps.current){
            containerSteps.current.scrollLeft += 250;
        }
        
        // updateFormSteps();
        // updateStepper();
        // dragdrop.classList.add('form-step')
    
        if ((formstepnum + 1) == 8){
            // nextBtn.classList.add('next-btn');
            setNextBtn("download cv")
        }
    }
    
    
    const handleBack = ()=>{
        setFormstepnum((prevStep) => prevStep - 1);
        if (containerSteps.current){
            containerSteps.current.scrollLeft -= 250;
        }
    }


    return(
        <section class="main-sec">
        <div class="container">
            <div class="">
                <Title title={"create cv"}/>
            </div>

            <div class="steper-sec">
                <div class="steper-title">
                    <h2 style={{fontWeight:"700"}}>Customize your cv</h2>
                    <p>Here you can create your CV by answering questions and getting it ready for download or applying to jobs through the platform.</p>
                </div>
                 <div class="test container d-flex" ref={containerSteps}>

                    <div class="item item1  col-lg-3  m-1">
                        <div class={formstepnum >= 0 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>1</div>
                        <div class="steper-info text-uppercase">main information</div>
                    </div>
                    <div class="item item2 col-lg-3  m-1">
                        <div class={formstepnum >= 1 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>2</div>
                        <div class="steper-info text-uppercase">summary</div>
                    </div>
                    <div class="item item3 col-lg-3 m-1">
                        <div class={formstepnum >= 2 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>3</div>
                        <div class="steper-info text-uppercase">Skills</div>
                    </div>
                    <div class="item  col-lg-3 m-1"  >
                        <div class={formstepnum >= 3 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>4</div>
                        <div class="steper-info text-uppercase">Experience</div>
                    </div>
                    <div class="item  col-lg-3  m-1">
                        <div class={formstepnum >= 4 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>5</div>
                        <div class="steper-info text-uppercase">Education</div>
                    </div>
                    <div class="item  col-lg-3  m-1">
                        <div class={formstepnum >= 5 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>6</div>
                        <div class="steper-info text-uppercase">Honers & Awards</div>
                    </div>
                    <div class="item  col-lg-3  m-1">
                        <div class={formstepnum >= 6 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>7</div>
                        <div class="steper-info text-uppercase">Hobbies & Interests</div>
                    </div>
                    <div class="item item8 col-lg-3  m-1">
                        <div class={formstepnum >= 7 ? "steper-number progress-step-active":"steper-number "} style={{fontWeight:"700"}}>8</div>
                        <div class="steper-info text-uppercase">Links</div>
                    </div>
                    
                 </div>
            
                <div class="cv-progress d-flex flex flex-wrap  ">

                    <div class="col-lg-6 col-xs-12 d-flex flex-column mb-5">
                        <div class={formstepnum === 0 ? "cv-progress-item information-sec form-step form-step-active ":'form-step'  }>
                        
                        <Maininfo/>
                        </div>
                        <div class={formstepnum === 1 ? " form-step-active ":'form-step'}> <Cvabout/>      </div>
                        <div class={formstepnum === 2 ? " form-step-active ":'form-step'}> <Cvskills /> </div>
                        <div class={formstepnum === 3 ? " form-step-active ":'form-step'}><CvExperience/>    </div>
                        <div class={formstepnum === 4 ? " form-step-active ":'form-step'}><Cveducation />     </div>
                        <div class={formstepnum === 5 ? " form-step-active ":'form-step'}><Honersandawards />    </div>
                        <div class={formstepnum === 6 ? " form-step-active ":'form-step'}><Hobbiesandinterests/> </div>
                        <div class={formstepnum === 7 ? " form-step-active ":'form-step'}> <Cvlinks />          </div>
                    

                    {/* <div class="drag-drop"></div> */}
                    </div>
                    <div class="col-xs-12 order-xs-12 col-lg-6 phone-none">
                        <CvDesign/>
                    </div>
                </div>

            </div>
                 <div class="form-group col-xs-11 col-lg d-flex gap-3  ">
                    <button id="nextBtn" onClick={handleNext} class={(formstepnum + 1) === 8 ? "btn disabled next-btn px-4" : " btn px-4"} >{nextBtn}</button>
                    <button id="previusBtn" onClick={handleBack} class={(formstepnum + 1) === 1 ? "btn disabled px-4" : " btn px-4"}>Back</button>

                 </div>


        </div>
        <Footer/>
     </section>
        
    )
}

export default CvShape;