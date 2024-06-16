import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import News from "./News";
import { INews } from "../interfaces/NewsInterfaces";

//if fetch returns data.articles, this interface is not needed; otherwise keep it
export interface HeadlinesData {
  articles: INews[];
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function HeadlinesList() {
  const [headlineNews, setHeadlineNews] = React.useState<INews[]>([]);

  //we expect that useLoaderData will return an object that has the 'articles' property which is an array
  const response = useLoaderData() as HeadlinesData;
  const [error, setError] = React.useState<null | string>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (response && response.articles) {
      setHeadlineNews(response.articles);
    } else {
      setError("Data was not fetched");
    }
  }, [response]);

  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{ mt: 5, mb: 10 }}
    >
      {navigation.state === "loading" ? (
        <CircularProgress
          sx={{ position: "absolute", top: "40%", left: "50%" }}
          size={100}
        />
      ) : error ? (
        <Box
          sx={{
            textAlign: "center",
            mt: { md: "15%", sm: "50%", xs: "70%" },
          }}
        >
          <Typography color="text.secondary" variant="h3">
            Oops! Something went wrong.
          </Typography>
        </Box>
      ) : (
        headlineNews
          .filter((news: INews) => news.title !== "[Removed]")
          .map((news: INews, index: number) => {
            return (
              <Grid xs={10} md={5} key={index}>
                <News headlineNews={news} />
              </Grid>
            );
          })
      )}
    </Grid>
  );
}

export const fetchData = async (): Promise<any> => {
  const response = await fetch(
    `${proxyUrl}https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_KEY}`
  );
  const data = await response.json();
  return data;
};

export default HeadlinesList;
