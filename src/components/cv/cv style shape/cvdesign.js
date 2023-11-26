import {useSelector} from "react-redux"
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CvDesign(){
const cvData = useSelector(state=>state.cvData)
const mainData = cvData.mainData;
const aboutData = cvData.aboutData;
const links = cvData.links;
const skills = cvData.skills;
const experience = cvData.experience;
const education = cvData.education;
const awards = cvData.awards;
const hobbies = cvData.hobbies;
const personalPhoto = cvData.personalPhoto;
const companyLogo = cvData.companyLogo;

console.log(cvData)
console.log(education)
const webSectionRef = useRef(null);

const generatePDF = () => {
  const targetElement = webSectionRef.current;

  html2canvas(targetElement).then((canvas) => {
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('web_section.pdf'); // Trigger the download of the PDF file
  });
};
    return(
        <div class="information-container w-100">
            <div class="row mx-0 w-100" ref={webSectionRef}  id="webSection"    >
                <div class="col-5 " style={{backgroundColor: "#233a5f"}}>
                    <div>
                    <img  class="rounded-circle  mx-auto mt-2 d-block " src={personalPhoto && URL.createObjectURL(personalPhoto)} alt="" width="130" height="130" />
                    </div>
                <h4 class="text-white ps-3 mb-1 text-center">{mainData.firstName} {mainData.lastName}</h4>
                <p class=" m-0 text-start ps-3 mb-2 text-secondary  fw-small">{mainData.profession}</p>
                <form className="mx-auto">
                    <div class=" mb-1 mx-auto text-center bg-light-subtle  rounded  p-0 form-check ">
                        <p className="text-light text-dark m-0"> {mainData.birthday}</p>
                    </div>
                    <div class="mb-1 mx-auto text-center bg-light-subtle  rounded  p-0 form-check">
                    <p className="text-light m-0 text-dark  "> {mainData.mobileNumber}</p>
                    </div>
                    <div class="mb-1 mx-auto  text-center bg-light-subtle  rounded  p-0 form-check">
                    <p className="text-light m-0 text-dark  "> {mainData.email}</p>
                    </div>
                        <div class="mb-1 text-center bg-light-subtle rounded  p-0 form-check">
                        <p className="text-light m-0 text-dark  "> {mainData.city} {mainData.country}</p>
                    </div>
                    <div class=" mb-1mx-auto text-center bg-light-subtle  rounded  p-0 form-check ">
                        <p className="text-light m-0 text-dark  "> {mainData.state}</p>
                    </div>
                </form>
                <h6 class="text-white ">Skills</h6>
                <ul>
                    {
                    skills?.map(skill=>(
                        <li className="text- text-secondary  mb-1"> {skill}</li>
                    ))
                }
                </ul>
                
                <h6 class="text-white ">Honor & Award</h6>
                
                    {
                    awards?.map(award=>(
                        <>
                        <div className="d-flex justify-content-between ">
                            <p className="text-secondary  mb-1 "> {award.awardName}</p>
                            <p className="text-secondary  mb-1"> {award.awardYear}</p>
                        </div>
                        <p className="text-secondary  mb-1"> {award.awardDescription}</p>
                        </>
                    ))
                }
                <h6 className="text-light">Hobbies</h6>
                <ul>
                    {
                    hobbies?.map(hobby=>(
                        <li className="text-secondary mb-1"> {hobby}</li>
                    ))
                }
                </ul>
                
                <h6 class="text-white ">Links and Credentials</h6>
                {
                    links?.map(link=>(
                        <p className="text-light  mb-1">
                            {/* <i class="fa-brands fa-linkedin text-white ms-5"></i> */}
                            <p class="text-white m-0">{link.website}  </p>
                            <p className="text-secondary ps-1">{link.url}</p>
                        </p>
                    ))
                }
                {/* <i class="fa-brands fa-github text-white ms-3"></i>
                <span class="text-white text-center">Github</span>
                <br/>
                <i class="fa-solid fa-arrow-up-right-from-square text-white ms-5"></i>
                <span class="text-white text-center">Website</span> */}
            </div>     
            <div class="col-7 bg-white">
                <div class="main-title mt-3 mb-3 position-relative">
                    <h6 class="pt-3 ms-4 fw-bold" style={{color:'#151B54'}}>About</h6>
                    {
                    aboutData?.join('')
                }
                </div>            

                <div class="main-title mt-3 mb-3 position-relative">
                    <h6 class="pt-3 ms-4 fw-bold" style={{color:'#151B54'}}>Education</h6>
                    <ul>
                    {
                        education?.map((edu,index)=>(
                            <li>
                            <div className="d-flex gap-3" key={index}>  
                                <div>
                                {edu.From} - {edu.To}
                                </div>
                                <div>
                                    <h6 className="mb-1">{edu.Organization}</h6>
                                    <h6 className="mb-2 fw-bold ">{edu.Degree}</h6>
                                    <p className="mb-1">{edu.Descrpition}</p>
                                </div>
                            </div>
                            </li>
                        ))
                    }
                    </ul>

                </div>
                
                
                <div class="main-title mt-3 mb-3 position-relative">
                    <h6 class="pt-3 ms-4 fw-bold" style={{color:'#151B54'}}>Experience</h6>
                    <ul>
                    {
                    experience?.map((exp,index)=>(
                        <li>
                            <div className="d-flex gap-3" key={index}>  
                                <div>
                                <img src={companyLogo && URL.createObjectURL(companyLogo)} style={{width:"60px",height:'60px'}}/>
                                </div>
                                <div>
                                    <h6 className="mb-1 text-secondary ">{exp.organization}</h6>
                                    <span className="mb-2 fw-bold text-secondary">{exp.position}</span><span> | {exp.from} - {exp.to} </span>
                                    <p className="mb-1 text-secondary">{exp.company}</p>
                                </div>
                            </div>
                            </li>
                    ))
                }
                    </ul>
                </div>
            </div>
        </div> 
            <button onClick={generatePDF} className={setTimeout(()=>{},100)}>Download PDF</button>
    </div>
    )
}
export default CvDesign