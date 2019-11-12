import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Header from './components/Header';
import List from './components/List';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header/>
      <List />
    </Provider>
  );
}

export default App;
