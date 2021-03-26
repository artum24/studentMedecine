import Footer from "../Footer";
import Header from "../Header";
import useStyles from "./styles";

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
