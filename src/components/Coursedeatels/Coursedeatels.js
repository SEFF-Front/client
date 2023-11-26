import React, { useState } from "react";
import "./Coursedeatels.css"
import image from "../../assest/main_background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faChartSimple,faUser,faMessage,faClock,faCalendar,faCertificate,faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";

const Coursedeatels = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (accordionId) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  };
  return (
    <>
      <div className="tech-overlay">
        <section className="tech">
          <h4 className="tech-title">tech</h4>
          <div className="tech-line"></div>
          <h1>Python programming language</h1>
          <h4>
            <span>Instructor : </span>Mohammed Nour
          </h4>
          <div
            className="row d-flex flex-row justify-content-between"
            id="first-sec"
          >
            <div className="col-lg-7 col-sm-12">
              <img
                className="rounded w-100"
                src={image}
                alt="picture"
              /><div className=" col-sm-12 my-5" id="tech-data3">
              <h3>Introduction</h3>
              <p style={{textAlign:"justify"}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, sit aspernatur. Quae provident dignissimos
                temporibus sit cumque! Ratione praesentium iste incidunt
                reprehenderit vel, nam quis, corporis voluptas tenetur harum a.
              </p>
            </div>
                          <div className=" col-sm-12 lessions-data">
              <h3>Lessions</h3>
              
              <div id="accordion">
                <div className="card col-lg-8 col-sm-12" id="item">
                  <div className="card-header" onClick={() => handleAccordionClick('collapseOne')}
                    
                      // className="card-link"
                      data-toggle="collapse"
                      href="#collapseOne"
                    >
                      <h3 className="d-flex justify-content-between ">
                        Introduction To Python <FontAwesomeIcon className={activeAccordion === 'collapseOne' ? 'icon rotate' : 'icon'} icon={faPlus} />
                      </h3>
                    
                  </div>
                  <div
                    id="collapseOne"
                    // className="collapse show"
                    data-parent="#accordion" className={`collapse ${activeAccordion === 'collapseOne' ? 'show' : ''}`}
                  >
                    <div className="card-body">
                      <p style={{textAlign:"justify"}}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus, sit aspernatur. Quae provident
                        dignissimos temporibus sit cumque!
                      </p>
                      <button>watch lecture</button>
                    </div>
                  </div>
                </div>

                <div className="card col-lg-8   col-sm-12" id="item">
                  <div className="card-header" onClick={() => handleAccordionClick('collapseTwo')}>
                    <a
                      className="collapsed card-link"
                      data-toggle="collapse"
                      href="#collapseTwo"
                    >
                      <h3 className="d-flex justify-content-between "> 
                      
                        Functions <FontAwesomeIcon className={activeAccordion === 'collapseTwo' ? 'icon rotate' : 'icon'} icon={faPlus} />
                      </h3>
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className={`collapse ${activeAccordion === 'collapseTwo' ? 'show' : ''}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p style={{textAlign:"justify"}}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus, sit aspernatur. Quae provident
                        dignissimos temporibus sit cumque!
                      </p>
                      <button>watch lecture</button>
                    </div>
                  </div>
                </div>

                <div className="card col-lg-8 col-sm-12" id="item">
                  
                  <div className="card-header" onClick={() => handleAccordionClick('collapseThree')}>
                    <a
                      className="collapsed card-link"
                      data-toggle="collapse"
                      href="#collapseThree"
                    >
                      <h3 className="d-flex justify-content-between ">
                        Arrays<FontAwesomeIcon className={activeAccordion === 'collapseThree' ? 'icon rotate' : 'icon'} icon={faPlus} />
                      </h3>
                    </a>
                  </div>
                  <div
                    id="collapseThree"
                    className={`collapse ${activeAccordion === 'collapseThree' ? 'show' : ''}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p style={{textAlign:"justify"}}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatibus, sit aspernatur. Quae provident
                        dignissimos temporibus sit cumque!
                      </p>
                      <button>watch lecture</button>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            </div>
            <div className="col-lg-3 col-sm-12">
              <div className="row d-flex gap-3" id="tech-data">
                <div className="col-lg-5 d-flex gap-" id="data">
                <FontAwesomeIcon icon={faFile} className="icon" />                 
                <p>
                    Lessions <br /> <span className=" text-light-emphasis ">12</span> 
                  </p>
                </div>
                <div className="col-lg-5 d-flex " id="data">
                <FontAwesomeIcon icon={faChartSimple}className="icon" />
                  <p >
                    Level <br /> <span className=" text-light-emphasis ">Beginer</span> 
                  </p>
                </div>
              </div>
              <div id="tech-data2">
                <p className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faUser} className="icon text-light "/>Students :{" "}
                  <span>20</span>
                </p>
                <p className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faMessage} className="icon text-light"/>Language :{" "}
                  <span>Arabic</span>
                </p>
                <p className="d-flex align-items-center ">  
                <FontAwesomeIcon icon={faClock}className="icon text-light"  />Duration :{" "}
                  <span>13 hours</span>
                </p>
                <p className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faCalendar} className="icon text-light"/>Start date :{" "}
                  <span>Wedenesday , June 7th</span>
                </p>
                <p className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faCertificate} className="icon text-light"/>Certificate :{" "}
                  <span>Upon completion</span>
                </p>
                <button className="btn">enrolled</button>
              </div>
              <div className=" col-sm-12 mt-5" id="tech-data4">
              <h3 className="my-4">Assessment</h3>
              <p style={{textAlign:"justify"}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, sit aspernatur. Quae provident dignissimos
                temporibus sit cumque! Ratione praesentium iste
              </p>
              <h3 className="my-4">Requirements</h3>
              <p style={{textAlign:"justify"}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, sit aspernatur. Quae provident dignissimos
                temporibus sit cumque! Ratione praesentium iste
              </p>
              <h3 className="my-4">Materials</h3>
              <p style={{textAlign:"justify"}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, sit aspernatur. Quae provident dignissimos
                temporibus sit cumque! Ratione praesentium iste
              </p>
            </div>
            </div>
            
          </div>
          <div className="row" id="second-sec">
            
            <div className="col-lg-2"></div>
            

          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};
export default Coursedeatels;
