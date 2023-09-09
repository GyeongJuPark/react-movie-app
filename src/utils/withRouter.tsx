import { useParams } from "react-router-dom"



const withRouter = (WrappedComponent : React.ComponentType<any>)=>(props : any)=>{const parmas = useParams(); return (<WrappedComponent {...props} parmas = {parmas.id}/>)} 

export default withRouter;