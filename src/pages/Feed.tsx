import React from "react";
import { useParams } from "react-router-dom";
import { filters, moreFilters } from "../components/Header";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import NewsFeed from "../components/NewsFeed";
import HeadlineFilter from "../components/HeadlineFilter";
import AllFilter from "../components/AllFilter";
import { INews } from "../interfaces/NewsInterfaces";
import { IOtherFilters } from "../interfaces/FilterInterfaces";
import { PageContext } from "../context/Page";
import { PageContextType } from "../interfaces/ContextInterfaces";

function Feed() {
  const pageLimit = 20;
  const categoryFilter = useParams();
  const [news, setNews] = React.useState<INews[]>([]);
  const [otherFilters, setOtherFilters] = React.useState<IOtherFilters>({});
  const [newsTotalResults, setNewsTotalResult] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { page, changePage } = React.useContext<PageContextType>(PageContext);

  const getNumberOfPages = () => {
    return Math.ceil(newsTotalResults / pageLimit);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    changePage(value);
  };

  React.useEffect(() => {
    setLoading(true);
    try {
      fetchNewsCategoryData(
        categoryFilter.filter || "",
        otherFilters,
        page,
        pageLimit
      ).then((res) => {
        setNews(res.articles);
        setNewsTotalResult(res.totalResults);
        setLoading(false);
        console.log(page);
      });
    } catch (err) {
      let message: string;
      if (err instanceof Error) {
        message = err.message;
      } else message = String(error);
      setError(message);
    }
  }, [categoryFilter, page]);

  return (
    <Box>
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "40%", left: "50%" }}
          size={100}
        />
      )}
      {news.length > 0 && (
        <Box sx={{ display: "flex", mt: 5, mb: 5 }}>
          {categoryFilter.filter === "All" && <AllFilter />}
          {categoryFilter.filter !== "All" && <HeadlineFilter />}
          <Box>
            <NewsFeed news={news} />
            {newsTotalResults > pageLimit && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Pagination
                  count={getNumberOfPages()}
                  onChange={handlePageChange}
                  page={page}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      {news.length === 0 && !loading && (
        <Box sx={{ textAlign: "center" }}>
          <Typography color="text.secondary" variant="h3">
            No results were found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
const setFetchQuery = (otherFilters: IOtherFilters): string => {
  if (!Object.keys(otherFilters).length) {
    return "";
  } else {
    let query = "";
    Object.keys(otherFilters).forEach((key: string) => {
      const value = otherFilters[key as keyof IOtherFilters];
      query += `${key}=${value}&`;
    });
    return query;
  }
};

export const fetchNewsCategoryData = async (
  category: string,
  otherFilters: IOtherFilters,
  page: number,
  pageLimit: number
): Promise<any> => {
  let response;
  if (category === "All" || "") {
    response = await fetch(
      `https://newsapi.org/v2/everything?q=a&language=en&pageSize=${pageLimit}&page=${page}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
    );
  } else if (
    (filters.includes(category) || moreFilters.includes(category)) &&
    category !== "All"
  ) {
    const query = setFetchQuery(otherFilters);
    //console.log(query);
    response = query
      ? await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&pageSize=${pageLimit}&page=${page}&${query}apiKey=${
            process.env.REACT_APP_NEWS_KEY
          }`
        )
      : await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&country=us&pageSize=${pageLimit}&page=${page}&apiKey=${
            process.env.REACT_APP_NEWS_KEY
          }`
        );
  } else {
    response = await fetch(
      `https://newsapi.org/v2/everything?q=a&language=en&pageSize=${pageLimit}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
    );
  }

  const data = await response?.json();
  return data;
};

export default Feed;
