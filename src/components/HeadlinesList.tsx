import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useLoaderData } from "react-router-dom";
import News from "./News";
import { INews } from "../interfaces/NewsInterfaces";

//if fetch returns data.articles, this interface is not needed; otherwise keep it
export interface HeadlinesData {
  articles: INews[];
}

function HeadlinesList() {
  const [headlineNews, setHeadlineNews] = React.useState<INews[]>([]);

  //we expect that useLoaderData will return an object that has the 'articles' property which is an array
  const response = useLoaderData() as HeadlinesData;
  const [error, setError] = React.useState<null | string>(null);

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
      {headlineNews
        .filter((news: INews) => news.title !== "[Removed]")
        .map((news: INews, index: number) => {
          return (
            <Grid xs={10} md={5} key={index}>
              <News headlineNews={news} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export const fetchData = async (): Promise<any> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_KEY}`
  );
  const data = await response.json();
  return data;
};

export default HeadlinesList;
