import { Link } from "react-router";
import logo from "../../assets/Logo_signup_login.png"

function Logo(){
    return(
        <div className="flex justify-center pt-8 bg-[#0D5FAA]">
            <Link to="/">
            <img
                src={logo}
                alt=""
                className="w-70 hover:scale-110 transition-all"
            ></img>
            </Link>
        </div>
    )
}

export default Logo