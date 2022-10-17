import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import reportWebVitals from './reportWebVitals';
import { DefaultRoutes } from './routes/DefaultRoutes';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global-styles';
import { Main } from './page-bases/Main';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/apollo/apolloClient';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main>
          <DefaultRoutes />
        </Main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={5}
        />

        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

reportWebVitals();
