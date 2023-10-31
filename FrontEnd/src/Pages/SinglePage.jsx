import Teamselect from "../components/TeamSelect/Teamselect";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function SinglePage(){
    return(
        <div>
            <Header/>
            <Teamselect/>
            <Footer/>
        </div>
    )
}