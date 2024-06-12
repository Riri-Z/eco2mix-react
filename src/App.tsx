import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppWrapper from './components/AppWrapper';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.warn('error query', error),
  }),
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
