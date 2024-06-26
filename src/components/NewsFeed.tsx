import Grid from "@mui/material/Grid";
import News from "./News";
import { INews } from "../interfaces/NewsInterfaces";

export interface newsData {
  news: INews[];
}

function NewsFeed({ news }: newsData) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{ mt: { md: 0, xs: 20 } }}
    >
      {news.map((news: INews, index: number) => {
        return (
          <Grid xs={10} md={5} key={index} item={true}>
            <News headlineNews={news} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NewsFeed;
