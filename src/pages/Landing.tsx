import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeadlinesList from "../components/HeadlinesList";

function Landing() {
  return (
    <Box sx={{ m: 5 }}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary.main">
          Top Headlines of the Day
        </Typography>
      </Container>
      <HeadlinesList />
    </Box>
  );
}

export default Landing;
