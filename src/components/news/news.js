import './news.css'
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../assest/oooo.jpg';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter, Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ShowNews from './showNew';
import Footer from '../footer/Footer';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CustomUI from './../alert/CustomUi';
import { useSelector ,useDispatch } from 'react-redux';
import {  useEffect  } from "react";

import LoginComponent from './../login/Login';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './../alert/customUi.css';
import Helmet from 'react-helmet';
import { 
  fetchAllArticles,
  getArticle,
} from "../redux/reducers/ArticlesSlice";
import backimg from'./../../assest/main_background.jpg'
import { formatDistanceToNow } from 'date-fns';
function News(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { all: articles } = useSelector((state) => state.articles);
    useEffect(() => {
      dispatch(fetchAllArticles());
    }, [dispatch]);

    const handleGetArticle = (articleId) => {
      dispatch(getArticle(articleId))
        .unwrap()
        .then(() => {
          navigate("/ShowNews");
        })
        .catch((error) => { 
          console.error("Error fetching article:", error);
    
         });
    };
    

  const { isAuthenticated } = useSelector((state) => state.user);
  const submit1 = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="popup-overlay">
        <h5 className='poptitle'>Please login to view this page</h5>
        <button onClick={onClose} className='popclose'>
        <FontAwesomeIcon icon={faXmark} />
        </button>
        <button className="nav-link  p-0 text-light"
          onClick={()=>{onClose();handlelogin()}}
        >
          Login
        </button>
      </div>
        );
      }
    });
  };
  const back={background:"red"};
//   const users = useSelector(state=>state.users)
// const user = users.filter(user=>user?.online == true)[0] 
  function handlelogin(){
    navigate('/login')}
    
    return(
      <>
      <Helmet>
      <style>
      {`
      body {
        background-image: url(${backimg});
        }
      `}
      </style>
       </Helmet>
      {!isAuthenticated&&submit1()}
        <div class="contin mt-3">
        <div class="child-contin">
          <div class="container" style={{fontFamily:"sans-serif"}}>
            <div class="col-xs-12  text-light mb-5 mt-5 ">
              <h1>SOFTWARE ENGINEERING<br/>FOR FUTURE</h1>
            </div>
            <div class="box p-3">
              <div class="row ">
                <div class="col-xs-12 col-md-6 d-flex flex-row ">
                  <div class=" d-none d-md-block col-md-2">
                    <p class="FEATURED">FEATURED NEWS</p>
                  </div>
                  <Link to='/showNews'>
                  <div class="col-xs-12 col-md-10 w-100">
                    <div class="EDUCATION">
                      <p>EDUCATION</p>
                      <div class="line"></div>
                      <div class="row">
                        <h3 class="col-9"> HERE'S THE TITLE OF THE ARTICLE</h3>
                        <small class=" col-3 text-center fw-light">
                        <FontAwesomeIcon className='text-secondary' icon={faClock} /> 2 h ago
                        </small>
                      </div>
                      <p class="pr-5 justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                        exerci eius maiores molestiae ducimus minus quae illum! Magni eum doloribus iusto vel
                        exceptur et do
                      </p>
                    </div>
                    
                  </div>
                </Link>
                </div>

                <div class="col-xs-12 col-md-6 d-flex flex-column">
                <Link to='/ShowNews'>
                  <div class="EDUCATION">
                    <p>EDUCATION</p>
                    <div class="line"></div>
                    <div class="row">
                      <h3 class="col-9"> HERE'S THE TITLE OF THE ARTICLE</h3>
                      <small class=" col-3 text-center fw-light">
                        <FontAwesomeIcon className='text-secondary' icon={faClock} /> 2 h ago
                      </small>
                    </div>
                    <p class="pr-5 justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                      exerci eius maiores molestiae ducimus minus quae illum! Magni eum doloribus iusto vel
                      exceptur et do
                    </p>
                  </div>
                  </Link>
                  <Link to='/ShowNews'>
                  <div class="EDUCATION">
                    <p>EDUCATION</p>
                    <div class="line"></div>
                    <div class="row">
                      <h3 class="col-9"> HERE'S THE TITLE OF THE ARTICLE</h3>
                      <small class=" col-3 text-center fw-light">
                        <FontAwesomeIcon className='text-secondary' icon={faClock} /> 2 h ago
                      </small>
                    </div>
                    <p class="pr-5 justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                      exerci eius maiores molestiae ducimus minus quae illum! Magni eum doloribus iusto vel
                      exceptur et do
                    </p>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
            <div class="margin_2"></div>
            {articles.map((article)=>(
                <div key={article.id} onClick={()=>{handleGetArticle(article._id)}} >
            <div class="row text-light sec2 p-4">
              <div class="col-xs-12 col-md-3">
              {article.cover && (
  <img
   class="sec2_img"
    src={`http://localhost:4000/seff-academy/uploads${article?.cover}`}
    alt="Company Logo"
    style={{ maxWidth: "100%", maxHeight: "200px" }}
  />
)}
              
              </div>
              <div class="col-xs-12 col-md-9 ">
                <p>{article.category}</p>
                <div class="line"></div>
                <div class="row">
                  <h3 class="col-9"> {article.title}</h3>
                  <small class=" col-3 text-center fw-light">
                        <FontAwesomeIcon className='text-secondary' icon={faClock} /> {article?.publish_date && (
  <p>{formatDistanceToNow(new Date(article.publish_date), { addSuffix: true })}</p>
)}
                  </small>
                </div>
                <div class="row">
                  <small class="col-11 pb-4 justify">
                    {article.content}
                  </small>
                  <span class="col-1 d-none d-md-block ">
                    <a class="sec2_igon"  target="_blank"><FontAwesomeIcon icon={faChevronRight} /></a>
                  </span>
                </div>
              </div>
            </div>
            </div>
            ))}
          
        
          </div>
        </div>
      </div>
      <Footer />
    </>
    )
}

export default News ;