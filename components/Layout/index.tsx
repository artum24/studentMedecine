import { useAuth } from "@/lib/auth";
import Footer from "../Footer";
import Header from "../Header";
import useStyles from "./styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const Layout: React.FC = ({ children }) => {
  const { showAlert, closeAlert } = useAuth();
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      {showAlert && (
        <Alert className={classes.alert} severity="success" onClose={closeAlert}>
          <AlertTitle>Успішно</AlertTitle>
          Запис до лікаря успішно створений!
        </Alert>
      )}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
