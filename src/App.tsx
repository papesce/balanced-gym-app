import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Header from './components/Header';
// import { ElemList } from './components/ElemList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header/>
      {/* <ElemList /> */}
    </Provider>
  );
}

export default App;
