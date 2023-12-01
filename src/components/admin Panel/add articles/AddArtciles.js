import {
  faCalendar,
  faChevronDown,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import Dragdrop from "../../Drag drop/Dragdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createArticle } from "../../redux/reducers/ArticlesSlice.";
import toast from "react-hot-toast";

function AddArticles() {
  const [articleDetails, setArticleDetails] = useState({
    title: "",
    category: "",
    content: "",
    publish_date: "",
    isPublished: false,
  });
const [img , setImg] = useState(null)
const [show , setShow] = useState(null)

const imgInput = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file)
    setShow(URL.createObjectURL(file))

  };

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setArticleDetails({ ...articleDetails, [id]: value });
  };

  const handleFileDrop = (droppedFile) => {
    setArticleDetails({ ...articleDetails, cover: droppedFile });
  };

  const saveData = () => {
    setArticleDetails({ ...articleDetails, isPublished: false });
    const required = Object.keys(articleDetails).every((key) => {
      if (articleDetails[key] !== undefined && articleDetails[key] !== "") {
        return true;
      } else {
        return false;
      }
    });
    required ? handleSuccess() : toast.error("fill all fields");

    // Implement logic to save data to a database or perform other actions
    // For example: Send articleDetails to an API endpoint for storage
  };
  const handleSuccess = (e) => {
    // dispatch(createArticle(articleDetails));
    // setArticleDetails({
    //   title: "",
    //   category: "",
    //   content: "",
    //   publish_date: "",
    //   cover: "",
    //   isPublished: false,
    // });
    // toast.success("successfully uploaded");
    // e.preventDefault();

    console.log(img);
    console.log(articleDetails);
  };
  const publishData = () => {
    setArticleDetails({ ...articleDetails, isPublished: true });
    dispatch(createArticle(articleDetails));
    console.log("Article Details:", articleDetails);
    // Implement logic to save data to a database or perform other actions
    // For example: Send articleDetails to an API endpoint for storage
  };

  return (
    <div class="container-fluid1 px-5 py-5 position-relative">
      <h4 class="add_article d-inline text-light">Add Article Details</h4>
      <button
        type="button"
        class="btn btn_publish1 btn_article text-light ps-4 pe-4  position-absolute end-0 me-5 fw-bold rounded-1"
        style={{ background: "#bf9b30" }}
      >
        PUBLISH
      </button>

      <div class="line_article mt-2"></div>

      <form onSubmit={handleSuccess} class="bg-container mt-4">
      
        <div class="article_form_container col-sm-12 sm-column-reverse">
          <div class="article_form ">
            <div class="row">
              <div class="col">
                <label
                  for="inputState"
                  class="form-label text-light mt-4 me-2 fw-medium"
                >
                  Article Title
                </label>
                <input
                  type="text"
                  class="form-control "
                  placeholder=""
                  aria-label="First name"
                  id="title"
                  value={articleDetails.title}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-md-4 text-light">
                <label
                  for="inputState"
                  class="form-label text-light mt-4 fw-medium"
                >
                  Category
                </label>
                <div class="input-group mb-3 ">
                  <input
                    type="text"
                    class="form-control border-0 "
                    aria-describedby="basic-addon1"
                    id="category"
                    value={articleDetails.category}
                    onChange={handleInputChange}
                  />
                  <span class="input-group-text border-0 opacity-75">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="color-yellow "
                    />{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label
                for="inputState"
                class="form-label text-light mt-4 fw-medium"
              >
                Content
              </label>
              <textarea
                class="form-control border-0 fw-bold opacity-25 rounded-1"
                rows="8"
                id="content"
                value={articleDetails.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div class="col-sm-3">
              <label for="inputState" class="form-label text-light fw-medium">
                Publishing Date
              </label>
              <div class="input-group mb-3 ">
                <span class="input-group-text border-0 text-white bg-secondary opacity-75">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="color-yellow "
                  />
                </span>
                <input
                  type="date"
                  class="form-control border-0  opacity-75 "
                  aria-describedby="basic-addon1"
                  id="publish_date"
                  value={articleDetails.publish_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* <div class="drag_drop_container">
            <label
              for="inputState"
              class="form-label text-light mt-4 mb-3 fs-5 fw-medium"
            >
              Upload Cover Photo
            </label>
            <Dragdrop onFileDrop={handleImageChange} />
          </div> */}

<div className="drag_drop_container">
        <label
          htmlFor="inputState"
          className="form-label text-light mt-4 mb-3 fs-5 fw-medium"
        >
          Upload Cover Photo
        </label>
        

        <input
         ref={imgInput}
          type="file"
          onChange={handleImageChange}
        />
      </div>
        </div>

        <div class="buttons_article d-flex justify-content-end mt-4 md-d-flex md-flex-column mb-3">
          <button
            type="button"
            class="btn btn_cancel btn_article btn-secondary text-light fw-bold rounded-1 fs-9 me-2"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="btn btn_save btn_article  text-light fw-bold rounded-1"
            style={{ background: "#bf9b30" }}
            onClick={saveData}
          >
            SAVE
          </button>
          <button
            type="button"
            class="btn btn_publish2 btn_article  text-light fw-bold rounded-1 d-none"
            style={{ background: "#bf9b30" }}
          >
            PUBLISH
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddArticles;
