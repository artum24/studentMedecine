import { Container, Divider, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <Container>
      <Divider light variant="middle" className="home__divider" />
      <Typography variant="subtitle1" align="right" color="primary">
        2021 Kiev, KPI
      </Typography>
    </Container>
  );
};

export default Footer;
