import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import moment from "moment";
import { Headline } from "./HeadlinesList";

type Props = {
  headlineNews: Headline;
};

function HeadlineNews({ headlineNews }: Props) {
  return (
    <Card sx={{ minHeight: 500 }}>
      <CardHeader
        title={headlineNews.title}
        subheader={moment(headlineNews.publishedAt).format("MMMM D YYYY")}
      />
      <CardMedia
        component="img"
        height="194"
        image={headlineNews.urlToImage || "./missing-news.jpg"}
        alt={headlineNews.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {headlineNews.description ||
            headlineNews.content ||
            "The decription might have been removed"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {headlineNews.author || ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="text">Go to Source</Button>
      </CardActions>
    </Card>
  );
}

export default HeadlineNews;
