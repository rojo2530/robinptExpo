// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import RootStore from './src/stores/root';
import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';
import { Provider } from 'mobx-react';
import MainRouter from './src/navigation/mainRouter';

export const rootStore: RootStore = new RootStore();

const hydrate = create({  
  storage: AsyncStorage,
  jsonify: true,
});

export default class App extends React.Component {
  state = {
    hydrate: false,
  }

  componentDidMount() {
    hydrate('shopsStore', rootStore.shopsStore).then(() => {
      this.setState({ hydrate: true });
    }).catch(error =>  {
      console.log('There is was an error ', error);
    });
  }
  
  render() {
    if (!this.state.hydrate) {
      return null;
    }

    return (
      <Provider rootStore={rootStore}>
        <MainRouter />
      </Provider>
    );
  }
}

