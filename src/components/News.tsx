import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import moment from "moment";
import { INews } from "../interfaces/NewsInterfaces";

type Props = {
  headlineNews: INews;
};

const cropContent = (content: string): string => {
  if (content.endsWith("]")) {
    const cropAt = content.lastIndexOf("[");
    return content.substring(0, cropAt);
  }
  return content;
};

function News({ headlineNews }: Props) {
  return (
    <Card sx={{ minHeight: 600 }}>
      <CardHeader
        title={headlineNews.title}
        subheader={moment(headlineNews.publishedAt).format("MMMM D YYYY")}
      />
      <CardMedia
        component="img"
        height="194"
        image={headlineNews.urlToImage || "../missing-news.jpg"}
        alt={headlineNews.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {headlineNews.description ||
            cropContent(
              headlineNews.content || "Go to the source to view the news"
            )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          {headlineNews.author || ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="text" href={`${headlineNews.url}`}>
          Go to Source
        </Button>
      </CardActions>
    </Card>
  );
}

export default News;
