import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const getAuthHeaders = () => {
    return { authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
}

const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_URL,
    headers: getAuthHeaders()
})

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;