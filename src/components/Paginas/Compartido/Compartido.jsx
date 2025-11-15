import { Outlet } from "react-router-dom";
import NavbarOffCanvas from "../../Navbar y Footer/NavbarOffCanvas.jsx";
import Footer from "../../Navbar y Footer/Footer.jsx";

const Fijo = () => {
  return (
    <div>
        <NavbarOffCanvas />
            <main className="main">
                <Outlet />
             </main>
        <Footer />
    </div>
  );
}

export default Fijo;
