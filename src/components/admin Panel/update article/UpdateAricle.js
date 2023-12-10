import { faCalendar, faChevronDown, faL } from '@fortawesome/free-solid-svg-icons';
import Dragdrop from '../../Drag drop/Dragdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateArticle } from '../../redux/reducers/ArticlesSlice';
import { enum_ArticlesCategory } from '../../../utils/config/enums';

function UpdateArticle() {
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImg(file);
		setShow(URL.createObjectURL(file));
	};
	const { getArticle: article } = useSelector((state) => state.articles);
	const [img, setImg] = useState(null);
	const [show, setShow] = useState(
		article?.cover ? `http://localhost:4000/seff-academy/uploads/${article.cover}` : ''
	);
	const imgInput = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			publish_date: article?.publish_date ?? null,
		};
	}, [article]);
	// Assuming initialArticleDataRef.current.publish_date is in the format "YYYY-MM-DDTHH:mm:ss.sssZ"

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { isSubmitSuccessful },
	} = useForm();
	const initialPublishDate = initialArticleDataRef?.current?.publish_date?.slice(0, 10);

	const onSubmit = (data) => {

		<input
			type="date"
			className="form-control border-0 opacity-75"
			aria-describedby="basic-addon1"
			id="publish_date"
			defaultValue={initialArticleDataRef.current.publish_date}
			{...register('publish_date')}
		/>;

		const articleData = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== undefined)
		);
		if (Object.keys(articleData).length === 0) {
			toast.warn('No data to submit.');
			return;
		}
		if (img) {
			articleData.cover = img;
		}

		dispatch(updateArticle({ articleId: article._id, updatedData: articleData }))
			.unwrap()
			.then(() => {
				toast.success('article Successfully Updated');
				navigate('adminPanel/articles');
				reset();
			})
			.catch((backendError) => {
				if (Array.isArray(backendError)) {
					backendError.map((error) => {
						toast.error(error.message);
					});
				} else {
					toast.error(backendError.error || 'An unknown error occurred');
				}
			});
	};

	return (
		<div className="container-fluid1 px-5 py-5 position-relative">
			<h4 className="add_article d-inline text-light">Update Article</h4>

			<div className="line_article mt-2"></div>

			<form onSubmit={handleSubmit(onSubmit)} className="bg-container mt-4">
				<div style={{ marginTop: '-60px' }} className="d-flex justify-content-end">
					<button
						type="submit"
						// className="btn btn_publish1 btn_article text-light ps-4 pe-4  position-absolute end-0 me-5 fw-bold rounded-1"
						className="btn btn_publish1 btn_article text-light ps-4 pe-4 fw-bold rounded-1"
						style={{ background: '#bf9b30' }}
						onClick={() => {
							setValue('isPublished', true);
							handleSubmit(onSubmit);
						}}
					>
						PUBLISH
					</button>
				</div>
				<div className="article_form_container col-sm-12 sm-column-reverse">
					<div className="article_form ">
						<div className="row">
							<div className="col">
								<label
									for="inputState"
									className="form-label text-light mt-4 me-2 fw-medium"
								>
									Article Title
								</label>
								<input
									type="text"
									className="form-control border-0"
									placeholder=""
									aria-label="title"
									id="title"
									defaultValue={initialArticleDataRef.current.title}
									{...register('title')}
									// value={article?.category}
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4 text-light">
								<label
									for="inputState"
									className="form-label text-light mt-4 fw-medium"
								>
									Category
								</label>
								<div class="btn-group">
									<input
										type="text"
										className="form-control rounded-end-0 dropdown-toggle"
										placeholder=""
										aria-label="First name"
										id="category"
										defaultValue={initialArticleDataRef.current.category}
										{...register('category')}
										// value={article?.category}
										// onChange={handleInputChange}
									/>
									<button
										type="button"
										class="btn dropdown-toggle dropdown-toggle-split btn-secondary"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<span class="visually-hidden">Toggle Dropdown</span>
									</button>
									<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-start">
										{enum_ArticlesCategory?.map((category) => (
											<li
												class="dropdown-item"
												key={category}
												value={category}
												onClick={() =>
													setValue('category', category, {
														shouldTouch: true,
													})
												}
											>
												{category}{' '}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<label
								for="inputState"
								className="form-label text-light mt-4 fw-medium"
							>
								Content
							</label>
							<textarea
								className="form-control border-0 fw-bold opacity-25 rounded-1"
								rows="8"
								id="content"
								defaultValue={initialArticleDataRef.current.content}
								{...register('content')}
								// value={articleDetails.content}
								// onChange={handleInputChange}
							></textarea>
						</div>
						<div className="col-sm-3">
							<label for="inputState" className="form-label text-light fw-medium">
								Publishing Date
							</label>
							<div className="input-group mb-3 ">
								<span className="input-group-text border-0 text-white bg-secondary opacity-75">
									<FontAwesomeIcon icon={faCalendar} className="color-yellow " />
								</span>
								<input
									type="date"
									className="form-control border-0  opacity-75 "
									aria-describedby="basic-addon1"
									id="publish_date"
									defaultValue={initialArticleDataRef.current.publish_date}
									{...register('publish_date')}
									// value={articleDetails.publish_date}
									// onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

					{/* <div className="drag_drop_container">
						<label
							for="inputState"
							className="form-label text-light mt-4 mb-3 fs-5 fw-medium"
						>
							Upload Cover Photo
						</label>
						<Dragdrop onFileDrop={handleImageChange} />
					</div> */}

					<div className="drag_drop_container">
						<label
							htmlFor="inputState"
							className="form-label text-light mt-4 mb-3 fs-5 fw-medium text-white"
						>
							Upload Cover Photo
						</label>

						<div>
							{show && (
								<img
									src={show}
									alt="Selected"
									style={{ maxWidth: '100%', maxHeight: '200px' }}
								/>
							)}

							<input ref={imgInput} type="file" onChange={handleImageChange} />
						</div>
					</div>
				</div>

				<div className="buttons_article d-flex justify-content-end mt-4 md-d-flex md-flex-column mb-3">
					<button
						type="reset"
						className="btn btn_cancel btn_article btn-secondary text-light fw-bold rounded-1 fs-9 me-2"
					>
						CANCEL
					</button>
					<button
						type="button"
						className="btn btn_save btn_article  text-light fw-bold rounded-1"
						style={{ background: '#bf9b30' }}
						onClick={() => setValue('isPublished', false)}
					>
						SAVE
					</button>
					<button
						type="button"
						className="btn btn_publish2 btn_article  text-light fw-bold rounded-1 d-none"
						style={{ background: '#bf9b30' }}
						onClick={() => setValue('isPublished', true)}
					>
						PUBLISH
					</button>
				</div>
			</form>
		</div>
	);
}
export default UpdateArticle;