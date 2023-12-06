import { faCalendar, faChevronDown, faL } from "@fortawesome/free-solid-svg-icons";
import Dragdrop from "../../Drag drop/Dragdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  createArticle, updateArticle } from "../../redux/reducers/ArticlesSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UpdateArticle(){ 
    


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setShow(URL.createObjectURL(file));  
  };
    const { getArticle: article } = useSelector((state) =>  state.articles);  
    const [img, setImg] = useState(null);
    const [show, setShow] = useState(
    article?.cover
      ? `http://localhost:4000/seff-academy/uploads/${article.cover}`
      : ''
  );
  console.log(img);
  
  const imgInput = useRef();
    const dispatch = useDispatch();
    const navigate =useNavigate()
    console.log(article)

    const initialArticleDataRef = useRef({
      title: article?.title ?? null,
      category: article?.category ?? null,
      content: article?.content ?? null,
      publish_date: article?.publish_date ?? null,
    });

    useEffect(() => {
      initialArticleDataRef.current = {
        title: article?.title ?? null,
        category: article?.category ?? null,
        content: article?.content ?? null,
        publish_date: article?.publish_date ??null,
      };
    }, [article]);
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitSuccessful },
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
      const articleData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== undefined)
      );
      if (Object.keys(articleData).length === 0) {
        toast.warn("No data to submit.");
        return;
      }
      if (img) {
        articleData.cover = img;
      } 
      
        dispatch(updateArticle({articleId:article._id,updatedData:articleData}))
          .unwrap()
          .then(() => {
            toast.success("article Successfully Updated");
            reset();
          })
          .catch((backendError) => {
            console.log(backendError);
            toast.error(backendError.error);
          });
    
  
     
      
    };
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="container-fluid1 px-5 py-5 position-relative">
        <h4 className="add_article d-inline text-light">Update Article </h4>
        <button type="button" className="btn btn_publish1 btn_article text-light ps-4 pe-4  position-absolute end-0 me-5 fw-bold rounded-1" style={{background:"#bf9b30"}}>PUBLISH</button>
        <div className="line_article mt-2"></div>
        
        <div className="bg-container mt-4">
            <div  className="article_form_container col-sm-12 sm-column-reverse">
                <div className="article_form ">
                    <div className="row">
                        <div className="col">
                            <label for="inputState" className="form-label text-light mt-4 me-2 fw-medium">Update Article Title</label>
                            <input type="text" className="form-control " placeholder="" aria-label="First name" 
                            id="title"
                            defaultValue={initialArticleDataRef.current.title}

                            {...register('title')} 
                            />
                        </div>
                        <div className="col-md-4 text-light">
                            <label for="inputState" className="form-label text-light mt-4 fw-medium">Update Category</label>
                            <div className="input-group mb-3 ">
                                <input type="text" className="form-control border-0 " aria-describedby="basic-addon1"
                                id="category"
                                defaultValue={initialArticleDataRef.current.category}

                                {...register('category')}
 
                                />
                                <span className="input-group-text border-0 opacity-75"><FontAwesomeIcon icon={faChevronDown } className='color-yellow ' /> </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="inputState" className="form-label text-light mt-4 fw-medium">Update Content</label>
                        <textarea className="form-control border-0 fw-bold opacity-25 rounded-1"  rows="8"
                        id="content"
                        defaultValue={initialArticleDataRef.current.content}

                        {...register('content')}
 
                        ></textarea>
                    </div>
                    <div className="col-sm-3">
                        <label for="inputState" className="form-label text-light fw-medium">Update Publishing Date</label>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text border-0 text-white bg-secondary opacity-75"><FontAwesomeIcon icon={faCalendar } className='color-yellow ' /></span>
                            <input type="date" className="form-control border-0  opacity-75 " aria-describedby="basic-addon1"
                            id="publish_date"
                            defaultValue={initialArticleDataRef.current.publish_date}

                            {...register('publish_date')}
 
                            />
                        </div>
                    </div>
                </div>
                
                
                <div className="drag_drop_container">
                    <label for="inputState" className="form-label text-light mt-4 mb-3 fs-5 fw-medium">Upload Updated Cover Photo</label>
                    {/* <Dragdrop onFileDrop={handleFileDrop} /> */}
                    <div>     
               {show && <img src={show} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />}

      <input ref={imgInput} type="file" onChange={handleImageChange} />
    </div>    
                </div>
            </div>

            <div className="buttons_article d-flex justify-content-end mt-4 md-d-flex md-flex-column mb-3">
                <button type="button" className="btn btn_cancel btn_article btn-secondary text-light fw-bold rounded-1 fs-9 me-2">CANCEL</button>
                <button type="submit" className="btn btn_save btn_article  text-light fw-bold rounded-1" style={{background:"#bf9b30"}}  >SAVE</button>
                <button type="button" className="btn btn_publish2 btn_article  text-light fw-bold rounded-1 d-none" style={{background:"#bf9b30"}}>PUBLISH</button>
            </div>
        </div>
    </form>
    )
}
export default UpdateArticle;