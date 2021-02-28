import { useState } from "react";
import Login from "../Login";
import { Button, Container } from "@material-ui/core";
import { useAuth } from "@/lib/auth";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, signout } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="lg">
      <div className="header">
        <div className="header__null" />
        <img
          className="header__logo"
          src="http://mobilnist.kpi.ua/wp-content/uploads/2017/12/%D0%9A%D0%9F%D0%98-%D0%BB%D0%BE%D0%B3%D0%BE.png"
          alt="logo"
        />
        {user ? (
          <div className="header__login">
            <p>{user.name}</p>
            <Button color="primary" onClick={() => signout()}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={handleClickOpen}>
            Login
          </Button>
        )}

        <Login handleClose={handleClose} open={open} />
      </div>
    </Container>
  );
};

export default Header;
