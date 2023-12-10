import './news.css';
import 'bootstrap/dist/css/bootstrap.css';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	BrowserRouter,
	Link,
	MemoryRouter,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import ShowNews from './showNew';
import Footer from '../footer/Footer';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CustomUI from '../alert/CustomUi';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import LoginComponent from '../login/Login';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './../alert/customUi.css';
import Helmet from 'react-helmet';
import { fetchAllArticles, getArticle } from '../redux/reducers/ArticlesSlice';
import backimg from './../../assest/main_background.jpg';
import moment from 'moment';

function AppsNews() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { all: allArticles } = useSelector((state) => state.articles);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		dispatch(fetchAllArticles());
	}, [dispatch]);

	useEffect(() => {
		const techArticles = allArticles.filter((article) => article.category === 'apps');
		setArticles(techArticles);
	}, [allArticles]);

	const handleGetArticle = (id) => {
		dispatch(getArticle(id))
			.unwrap()
			.then(() => {
				// navigate('/ShowNews');
				navigate(`/articles/${id}`);
			})
			.catch((error) => {
				console.error('Error fetching article:', error);
			});
	};

	const { isAuthenticated } = useSelector((state) => state.user);
	const submit1 = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="popup-overlay">
						<h5 className="poptitle">Please login to view this page</h5>
						<button onClick={onClose} className="popclose">
							<FontAwesomeIcon icon={faXmark} />
						</button>
						<button
							className="nav-link  p-0 text-light"
							onClick={() => {
								onClose();
								handlelogin();
							}}
						>
							Login
						</button>
					</div>
				);
			},
		});
	};
	const back = { background: 'red' };
	//   const users = useSelector(state=>state.users)
	// const user = users.filter(user=>user?.online == true)[0]
	function handlelogin() {
		navigate('/login');
	}

	return (
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
			{!isAuthenticated && submit1()}
			<div class="contin mt-3">
				<div class="child-contin">
					<div class="container" style={{ fontFamily: 'sans-serif' }}>
						<div class="col-xs-12  text-light mb-5 mt-5 ">
							<h1>
								SOFTWARE ENGINEERING
								<br />
								FOR FUTURE
							</h1>
						</div>
						<div class="box p-3">
							<div class="row ">
								<div class="col-xs-12 col-md-6 d-flex flex-row ">
									<div class=" d-none d-md-block col-md-2">
										<p class="FEATURED">FEATURED NEWS</p>
									</div>
									{articles.slice(0, 1).map((article) => (
										<div
											key={article.id}
											onClick={() => {
												handleGetArticle(article._id);
											}}
										>
											<div className="col-xs-12 col-md-10 w-100">
												<div className="EDUCATION">
													<p>{article.category}</p>
													<div className="line"></div>
													<div className="row">
														<h3 className="col-9">{article.title}</h3>
														<small className="col-3 text-center fw-light">
															<FontAwesomeIcon
																className="text-secondary"
																icon={faClock}
															/>{' '}
															{article?.publish_date && (
																<p>
																	{moment(
																		new Date(article?.publish_date)
																	).fromNow()}
																</p>
															)}
														</small>
													</div>
													<p className="pr-5 justify">{article.content}</p>
												</div>
											</div>
										</div>
									))}
								</div>{' '}
								<div class="col-xs-12 col-md-6 d-flex flex-column">
									{articles.slice(1, 3).map((article) => (
										<div
											key={article.id}
											onClick={() => {
												handleGetArticle(article._id);
											}}
										>
											<div class="EDUCATION">
												<p>{article.category}</p>
												<div class="line"></div>
												<div class="row">
													<h3 class="col-9"> {article.title}</h3>
													<small class=" col-3 text-center fw-light">
														<FontAwesomeIcon
															className="text-secondary"
															icon={faClock}
														/>{' '}
														{article?.publish_date && (
															<p>
																{moment(
																	new Date(article?.publish_date)
																).fromNow()}
															</p>
														)}
													</small>
												</div>
												<p class="pr-5 justify">{article.content}</p>
											</div>
										</div>
									))}{' '}
								</div>
							</div>
						</div>
						<div class="margin_2"></div>
						{articles.map((article) => (
							<div
								key={article.id}
								onClick={() => {
									handleGetArticle(article._id);
								}}
							>
								<div class="row text-light sec2 p-4">
									<div class="col-xs-12 col-md-3">
										{article.cover && (
											<img
												class="sec2_img"
												src={`http://localhost:4000/seff-academy/uploads${article?.cover}`}
												alt="Company Logo"
												style={{ maxWidth: '100%', maxHeight: '200px' }}
											/>
										)}
									</div>
									<div class="col-xs-12 col-md-9 ">
										<p>{article.category}</p>
										<div class="line"></div>
										<div class="row">
											<h3 class="col-9"> {article.title}</h3>
											<small class=" col-3 text-center fw-light">
												<FontAwesomeIcon
													className="text-secondary"
													icon={faClock}
												/>
												{article?.publish_date && (
													<p>
														{moment(
															new Date(article?.publish_date)
														).fromNow()}
													</p>
												)}
											</small>
										</div>
										<div class="row">
											<small class="col-11 pb-4 justify">
												{article.content}
											</small>
											<span class="col-1 d-none d-md-block ">
												<Link
													class="sec2_igon"
													to={`/articles/${article?._id}`}
												>
													<FontAwesomeIcon icon={faChevronRight} />
												</Link>
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
	);
}

export default AppsNews;
