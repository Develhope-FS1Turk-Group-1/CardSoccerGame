import Leaderboard from "../components/Leaderboard/Leaderboard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function DashboardPage(){
    return(
        <div>
            <Header/>
            <Leaderboard/>
            <Footer/>
        </div>
    )
}