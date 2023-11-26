import moment from 'moment';

function Title({title}){
    const date = moment();
    const currentDate = date.format('Do MMMM YY')
    return(
        <div className='mt-3'>
            <h3 className="text-uppercase fs-5 pb-2 text-light"  style={{width:'fit-content',borderBottom:"1px solid #bf9b30"}}>{title}</h3>
            <p className='text-light p-0 m-0 '>{currentDate}</p>
        </div>
    )
}

export default Title;