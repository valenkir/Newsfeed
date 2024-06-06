import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useLoaderData } from "react-router-dom";
import HeadlineNews from "./HeadlineNews";

export interface Headline {
  source?: {};
  author?: null | string;
  title?: string;
  description?: null | string;
  url?: URL;
  urlToImage?: null | string;
  publishedAt?: string;
  content?: string | null;
}

//if fetch returns data.articles, this interface is not needed; otherwise keep it
export interface HeadlinesData {
  articles: Headline[];
}

function HeadlinesList() {
  const [headlineNews, setHeadlineNews] = React.useState<Headline[]>([]);
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent={"center"}>
        {headlineNews.map((news: Headline, index: number) => {
          return (
            <Grid xs={5} key={index}>
              <HeadlineNews headlineNews={news} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

//TODO: add the return type
export const fetchData = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=6&apiKey=277ed278fe75469599c2f901d25015b3"
  );
  const data = await response.json();
  return data;
};

export default HeadlinesList;
