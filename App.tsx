import React from 'react';
import Routes from './src/routes';

import {Provider} from 'react-redux';
import store, {persistor, sagaMiddleware} from './src/redux/store';
import rootSaga from './src/redux/sagas';
import {PersistGate} from 'redux-persist/integration/react';
import Loading from './src/screens/Loading';

sagaMiddleware.run(rootSaga);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
