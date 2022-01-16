import {useParams} from "react-router-dom";
import Auth from "./Auth";
//container for using a hook useParams in a class component
const AuthContainer = ({authentificated}) => {
    let {id} = useParams()
    return <Auth authentificated={authentificated} id={id}/>

}
export default AuthContainer