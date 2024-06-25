import { Outlet } from "react-router-dom";
import Footer from "./screens/Footer/footer";
import { HomePrimaryMenu } from "./components/HomePrimaryMenu";
import './app.css';

export const App = () => {
    return (
        <div className="app-container">

            <div className="main-menu">
                <HomePrimaryMenu className="home-primary-menu-instance" />
            </div>
            <div className="main-and-footer">
                <div className="main-content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
};
