import { queryClient } from 'config/react-query';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App;