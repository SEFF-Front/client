import { useDispatch, useSelector } from 'react-redux';
import img from '../../assest/oooo.jpg';
import Footer from '../footer/Footer';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAllArticles, getArticle } from '../redux/reducers/ArticlesSlice';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import moment from 'moment';

function ShowNews() {
	const { articleId } = useParams();
	const dispatch = useDispatch();

	const { getArticle: article } = useSelector((state) => state.articles);
	const title = article?.title;
	const content = article?.content;
	const cover = article?.cover;
	const publish_date = article?.publish_date;
	const category = article?.category;
	useEffect(() => {
		dispatch(getArticle(articleId));
		// dispatch(fetchAllArticles());
	}, [articleId]);
	return (
		<>
			<div class="contin">
				<div class="child-contin">
					<div class="container">
						{/* <div class="menu_list fixed-top p-5"></div> */}
						{/* <div class="margin"></div> */}

						<div>
							{' '}
							<div class="text-light mb-5 m-auto" style={{ width: '90%' }}>
								<p>{category}</p>
								<div class="line"></div>
								<div class="row">
									<h3 class="col-xs-12 col-md-10"> {title}</h3>
									<small class="col-xs-12 col-md-2 d-flex justify-content-end fw-light">
										<p>
											<FontAwesomeIcon
												className="text-secondary"
												icon={faClock}
											/>{' '}
											{publish_date && (
												<p>
													{moment(new Date(article?.publish_date)).fromNow()}
												</p>
											)}
										</p>
									</small>
								</div>
							</div>
							<div class="box showdetail">
								{cover && (
									<img
										class="sec2_img"
										src={`http://localhost:4000/seff-academy/uploads${cover}`}
										alt="cover"
										style={{ maxWidth: '100%', maxHeight: '200px' }}
									/>
								)}
								<p class="mt-5 justify">{content} </p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
export default ShowNews;
