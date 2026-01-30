import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { BASE_API_URL } from "@/config/site";

const httpLink = new HttpLink({

  // uri: "https://master-api-mun0.onrender.com/graphql",
  // // uri: "http://localhost:8000/graphql",

  uri: `${BASE_API_URL}/graphql`,

});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
