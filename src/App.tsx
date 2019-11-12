import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header/>
    </Provider>
  );
}

export default App;
