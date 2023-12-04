import {
  faEdit,
  faPenToSquare,
  faSearch,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteArticle,
  fetchAllArticles,
  updateArticle,
} from "../../redux/reducers/ArticlesSlice.js";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../pagination/pagination";

function Articles() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // const [queries, setQueries] = useState({
  //   page: 1,
  //   fieldValue: "",
  //   fieldName: "",
  //   searchBy: "title",
  //   searchValue: "",
  // });
  // const handlePageChange = (page) => {
  //   setQueries((prevQueries) => ({ ...prevQueries, page }));
  // };

  // const handleSearch = () => {
  //   setQueries({
  //     ...queries,
  //     page:1,
  //     searchValue: search,
  //   });
  // };

  // useEffect(() => {
  //   dispatch(fetchAllArticles(queries));
  // }, [dispatch, queries]);

  // const { all: articles ,pagination } = useSelector((state) =>  state.articles);

  const { all: articles } = useSelector((state) => state.articles);
  // const {total, limit, page, pages}=pagination

  let diplayedArr = articles;
  if (search) {
    diplayedArr = articles.filter((el) =>
      el?.articleTitle.toLowerCase()?.includes(search.toLowerCase())
    );
  } else {
    diplayedArr = articles;
  }
  console.log(articles);
  const handleDeleteArticle = (articleId) => {
    dispatch(deleteArticle(articleId));
  };
  const handleUpdateArticle = (articleId) => {
    dispatch(updateArticle(articleId));
  };

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  const date = moment();
  const [isMobile, setIsMobile] = useState(false);
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
  const handleMobileView = useCallback(() => {
    console.log(availableWidth, isMobile);
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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);

  return (
    <>
      <div class="article-sec  ">
        {isMobile ? (
          ""
        ) : (
          <Link to="/adminPanel/addarticles">
            <button
              className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto"
              style={{ border: "1px solid #bf9b30" }}
            >
              {" "}
              Create new article
            </button>
          </Link>
        )}
        {isMobile ? (
          ""
        ) : (
          <div class="article-search d-lg-flex justify-content-lg-between">
            <h4 className="text-light">Articles</h4>
            <div class="search-div">
              <input
                type="text"
                placeholder="Search For Jobs"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{ padding: "5px", borderRadius: "5px" }}
              />
              <FontAwesomeIcon icon={faSearch} className="text-warning" />
            </div>
          </div>
        )}

        {isMobile ? (
          <div class="row m-0 mt-5 col-12" id="items">
            {diplayedArr?.map((article) => (
              <div
                class="col-12 text-light  user-part"
                id="item"
                key={article.id}
              >
                <button
                  className={
                    article.status
                      ? "table_btn publish_btn Active"
                      : "Active bg-secondary table_btn text-light"
                  }
                >
                  {article.status ? "published" : "draft"}
                </button>{" "}
                <h4>Title</h4>
                <p>{article.title}</p>
                <div class="d-flex  justify-content-between">
                  <div>
                    <h4>Category </h4>
                    <p>{article.category}</p>
                  </div>
                  <div>
                    <h4>Date & Time</h4>
                    {moment(article.publish_date, "YYYY-MM-DD").format(
                      "D MMMM YYYY"
                    )}
                    <br />
                    {""}
                  </div>
                </div>
                <div class="icons2 d-flex justify-content-end gap-2">
                  <Link to={"/adminPanel/updatearticle"}>
                    {" "}
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleUpdateArticle(article._id)}
                      className="table-icon"
                      color="#bf9b30"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteArticle(article._id)}
                    className="table-icon"
                    color="#bf9b30"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="article-content">
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
              {diplayedArr?.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>
                    <button
                      className={
                        article.status ? "" : "bg-secondary text-light"
                      }
                    >
                      {article.status ? "published" : "draft"}
                    </button>
                  </td>
                  <td>
                    {moment(article.publish_date, "YYYY-MM-DD").format(
                      "D MMMM YYYY"
                    )}
                    <br />
                    {""}
                  </td>
                  <td>
                    <Link to="/adminPanel/updatearticle">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => handleUpdateArticle(article._id)}
                        className="color-yellow"
                      />
                    </Link>
                    <Link
                      href=""
                      onClick={() => handleDeleteArticle(article._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="color-yellow"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}

        {isMobile ? (
          <Link to="/adminPanel/addarticles">
            <button
              className="row-btn col-12 ps-4 m-2 d-block pe-4 p-2 ms-auto text-light"
              style={{
                background: "#bf9b30",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {" "}
              Create new article
            </button>
          </Link>
        ) : (
          ""
        )}

        {/* <Pagination total={total} pages={pages} currentPage={page} limit={limit} onPageChange={handlePageChange} /> */}
      </div>
    </>
  );
}
export default Articles;
