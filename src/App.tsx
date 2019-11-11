import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>with redux</div>
    </Provider>
  );
}

export default App;
