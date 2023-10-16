import Link from "next/link";
import Image from "next/image";
import styles from "./LoginPageStyle.css"


const LoginPage = () => {
    return (
        <div className="soccerHomepage">
        <div className="soccerAllContainer">
            <div className="soccerSmallContainer">
                <h1>Hoş Geldin</h1>
                <input className="logInInput" type="text" placeholder="Kullanıcı Adı" />
                <input className="logInInput" type="text" placeholder="Şifre" />
                <div className="remindMe">
                    <div className="checkbox">
                        <input type="checkbox" id="remindMe" />
                        <label for="remindMe">Beni hatırla</label>
                    </div>
                    <Link href="/passwordReset">
                        <button className="forgottenPassword">Şifremi Unuttum</button>
                    </Link>
                </div>
                <Link href="/soccerHomePage">
                    <button className="logInButton">Giriş Yap</button>
                </Link>
                <Link href="/registerPage">
                    <button className="registerText">Henüz Hesabın Yok Mu? Kayıt Ol!</button>
                </Link>
            </div>
        </div>
    </div>
    );
};

export default LoginPage;