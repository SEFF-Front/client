import { faEdit, faPenToSquare, faSearch, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeArticle } from "../../redux/reducers/ArticlesSlice.";
import Pagination from "../../pagination/pagination";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
function DraftArticles(){
  var [search,setSearch]=useState("");
  const articles = useSelector(state=>state.articles)
  const draftArticles = articles.filter(article=>article.status === false);
  console.log(articles)
  let diplayedArr = draftArticles;
  if(search){
    diplayedArr=draftArticles.filter((el)=>el?.articleTitle.toLowerCase()?.includes(search.toLowerCase()))
  }else{
    diplayedArr = draftArticles;
  }
  const dispatch = useDispatch()

  // useEffect(()=>{
  //     dispatch(fetchArticles())
  // }
  // },[])
  const date =moment()
    const [isMobile , setIsMobile] = useState(false)
  const [availableWidth ,setAvailableWidth ] = useState(window.innerWidth)
  const handleMobileView = useCallback(() => {
    console.log(availableWidth,isMobile);
    if (availableWidth <= 778) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [availableWidth]);

  useEffect(() => {
    const handleResize = () => {
      setAvailableWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);
  
    return(
        <>
        <div class="article-sec  ">
          {
            isMobile?"":<Link to="/adminPanel/addarticles" >
            <button className="btn  ps-4 m-2 d-block pe-4 p-2 ms-auto color-yellow" style={{transform:'translateY(-50px)',border:"1px solid #bf9b30"}}> Create new article</button>
            </Link>
          }
              {
                isMobile?'':<div class="article-search d-lg-flex justify-content-lg-between">
                <h4 className="text-light">Articles</h4>
                <div class="search-div">
                  <input type="text" placeholder="Search For Jobs" onChange={(e)=>{setSearch(e.target.value)}} style={{padding:"5px",borderRadius:"5px"}}/>
                  <FontAwesomeIcon icon={faSearch} className="text-warning"/>
                </div>
              </div>
              }
              


                {isMobile?(<div class="row m-0 mt-5 col-12" id="items" >
                    {diplayedArr?.map((article,index)=>(
                      <div class="col-12 text-light  user-part" id="item" >
                      <button className={article.status?"table_btn publish_btn Active":"Active bg-secondary table_btn text-light"}>
                      {article.status ? "published" : "draft"}
                      </button>                          <h4>Title</h4>
                          <p>{article.articleTitle}</p>
                          <div class="d-flex  justify-content-between">
                              <div>
                                  <h4>Category </h4>
                                  <p>{article.category}</p>
                              </div>
                              <div><h4>Date & Time</h4>
                              { 
                              moment(article.publishingDate, 'YYYY-MM-DD').format('D MMMM YYYY')
                              }<br/>{""}
                              </div>
                          </div>
                          <div class="icons2 d-flex justify-content-end gap-2">
                            <FontAwesomeIcon icon={faEdit} className="table-icon" color="#bf9b30"/>
                            <FontAwesomeIcon icon={faTrash} onClick={()=>dispatch(removeArticle(article))} className="table-icon" color="#bf9b30"/>
                          </div>
                      </div>))}
                    </div>)
                  
                :  <div class="article-content">
                <table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
                  <thead className="m-3">
                    <tr>
                    <th class="col">Title</th>
                    <th class="col">Category</th>
                    <th class="col">Status</th>
                    <th class="col">Date & Time</th>
                    <th class="col"></th>
                </tr>
                  </thead>
                {diplayedArr?.map((article,index)=>(
                  <tr key={index}>
                    <td>{article.articleTitle}</td>
                    <td>{article.category}</td>
                    <td><button className={article.status?"":"bg-secondary text-light"}>
                      {article.status ? "published" : "draft"}
                      </button></td>
                    <td>{ 
                    moment(article.publishingDate, 'YYYY-MM-DD').format('D MMMM YYYY')
                    }<br/>{""}
                    </td>
                    <td>
                    <Link href="">
                      <FontAwesomeIcon icon={faPenToSquare} className='color-yellow' />
                    </Link> 
                    <Link href="" onClick={()=>dispatch(removeArticle(article))}>
                      <FontAwesomeIcon icon={faTrashCan} className='color-yellow' />
                    </Link>
                    </td>
                  </tr>))}
                </table>
                </div>
                }

                {isMobile?<Link to="/adminPanel/addarticles" >
            <button className="row-btn col-12 ps-4 m-2 d-block pe-4 p-2 ms-auto text-light" style={{background:"#bf9b30",border:"none",borderRadius:"5px"}}> Create new article</button>
            </Link>
                  :""}
            
            {/* <Pagination/> */}
              
            </div>
        </>
    )
}
export default DraftArticles;