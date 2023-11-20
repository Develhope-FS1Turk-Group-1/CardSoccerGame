import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import UserInfo from "../components/UserInfo/UserInfo";

export default function UserInfoPage(){
    return(
        <div>
            <Header/>
            <UserInfo />
            <Footer/>
        </div>
    )
}