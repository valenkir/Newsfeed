import React from "react";
import { useParams } from "react-router-dom";
import { filters, moreFilters } from "../components/Header";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import NewsFeed from "../components/NewsFeed";
import Filter from "../components/Filter";
import { INews } from "../interfaces/NewsInterfaces";
import { OtherFilters } from "../interfaces/FilterInterfaces";
import useSearchParamsContext from "../hooks/useSearchParamsContext";
import usePrevious from "../hooks/usePrevious";

function Feed() {
  const pageLimit = 20;
  const categoryFilter = useParams();
  const [news, setNews] = React.useState<INews[]>([]);
  const [newsTotalResults, setNewsTotalResult] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { searchParams, setSearchParams } = useSearchParamsContext();

  const getNumberOfPages = () => {
    return Math.ceil(newsTotalResults / pageLimit);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const page: OtherFilters = {};
    page.page = value;
    setSearchParams(page as URLSearchParams);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchNewsCategoryData(categoryFilter.filter || "", pageLimit, searchParams)
      .then((res) => {
        const validNews = res.articles.filter(
          (news: INews) => news.title !== "[Removed]"
        );
        setNews(validNews);
        setNewsTotalResult(res.totalResults);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        let message: string;
        if (err instanceof Error) {
          message = err.message;
        } else message = String(error);
        setError(message);
        setLoading(false);
      });
  }, [categoryFilter, searchParams]);

  return (
    <Box>
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "40%", left: "50%" }}
          size={100}
        />
      )}
      {!error && news.length > 0 && (
        <Box sx={{ display: "flex", mt: 5, mb: 10 }}>
          <Filter />
          <Box>
            <NewsFeed news={news} />
            {newsTotalResults > pageLimit && (
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}
              >
                <Pagination
                  count={getNumberOfPages()}
                  onChange={handlePageChange}
                  page={Number(searchParams.get("page")) || 1 || undefined}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      {news.length === 0 && !loading && (
        <Box
          sx={{
            display: { md: "flex", xs: "block" },
            gap: 40,
            mt: 5,
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Filter />
          <Typography
            color="text.secondary"
            variant="h3"
            alignSelf={"center"}
            sx={{
              mt: { xs: 35, md: 0 },
              textAlign: { xs: "center" },
            }}
          >
            No results were found
          </Typography>
        </Box>
      )}
      {error && (
        <Box sx={{ textAlign: "center", mt: { xs: 40, md: 1 } }}>
          <Typography color="text.secondary" variant="h3">
            Oops! Something went wrong.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
const setFetchQuery = (searchParams: URLSearchParams): string => {
  const template: OtherFilters = {
    country: "",
    q: "",
    page: 0,
  };

  let query = "";
  Object.keys(template).forEach((key: string) => {
    const value = searchParams.get(key);
    if (value) {
      query += `${key}=${value}&`;
    } else {
      switch (key) {
        case "page":
          query += "page=1&";
          break;
        case "country":
          query += "country=us&";
          break;
        default:
          break;
      }
    }
  });
  return query;
};

export const fetchNewsCategoryData = async (
  category: string,
  pageLimit: number,
  searchParams: URLSearchParams
): Promise<any> => {
  const query = setFetchQuery(searchParams);
  let response;
  if (category === "All" || "") {
    response = await fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=${pageLimit}&${query}apiKey=${process.env.REACT_APP_NEWS_KEY}`
    );
  } else if (
    (filters.includes(category) || moreFilters.includes(category)) &&
    category !== "All"
  ) {
    response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&pageSize=${pageLimit}&${query}apiKey=${
        process.env.REACT_APP_NEWS_KEY
      }`
    );
  }

  const data = await response?.json();
  const fetchError = new Error("Data wasn't fetched");
  if (data.status === "ok") {
    return data;
  } else {
    throw fetchError;
  }
};

export default Feed;
