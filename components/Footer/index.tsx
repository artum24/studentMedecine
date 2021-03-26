import { Container, Divider, Typography } from "@material-ui/core";

const Footer = () => (
  <Container style={{ marginTop: 100 }}>
    <Divider light variant="middle" />
    <Typography variant="subtitle1" align="right" color="primary">
      2021 Kiev, KPI
    </Typography>
  </Container>
);

export default Footer;
