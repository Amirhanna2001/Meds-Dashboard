import {useRouteError} from 'react-router-dom';

const Err = ()=>{
    const error = useRouteError();

    return <>
        <p>{error.statusText||error.message}</p>
    </>
}
export default Err;

