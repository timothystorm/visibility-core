import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';

function resolveLink(): ApolloLink {
  const scenario = new URLSearchParams(window.location.search).get('monitor');

  // return mock link
  if (scenario) {
    // Lazy load the mock module only when the ?monitor= param is present
    return new ApolloLink(
      () =>
        new Observable((observer) => {
          import('./mocks/mock.link')
            .then(({ resolveMock }) => {
              resolveMock(scenario).subscribe(observer);
            })
            .catch((err) => observer.error(err));
        }),
    );
  }

  // return http link
  return new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URI ?? '/graphql' });
}

export const apolloClient = new ApolloClient({
  link: resolveLink(),
  cache: new InMemoryCache(),
});
