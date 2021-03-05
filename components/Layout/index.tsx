import Footer from "../Footer";
import Header from "../Header";

const Layout: React.FC = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
