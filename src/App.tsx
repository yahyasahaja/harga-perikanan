import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './App.module.scss';
import './variables.scss';
import { generateAsyncComponent } from './components/AsyncComponent';
import OverlayLoading from './components/OverlayLoading';

const Home = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Home" */ './screens/Home')
);

const App = () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect from="*" to="/home" />
      </Switch>
      <OverlayLoading />
    </div>
  );
};

export default App;
