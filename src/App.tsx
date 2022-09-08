import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {Navigation} from './navigation';
import {store} from './store';

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  </Provider>
);

export default App;
