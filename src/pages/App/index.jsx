import React from 'react';
import { Provider } from 'react-redux';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Button from 'react-rainbow-components/components/Button';
import store from '../../redux/store';
import AdoptionCenter from '../AdoptionCenter';
import CleansingCenter from '../CleansingCenter';
import './styles.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Router className="paw_wrapper">
        <div className="paw_top-bar">
          <h1 className="paw_top-bar_header">Paw Inc.</h1>
          <Link to="/adoption" className="paw_top-bar_button">
            <Button label="Adoption Centers" variant="outline-brand" />
          </Link>
          <Link to="/cleansing">
            <Button label="Cleansing Centers" variant="outline-brand" />
          </Link>
        </div>
        <div className="paw_content">
          <Redirect from="/" exact to="/adoption" />
          <Route path="/adoption" component={AdoptionCenter} />
          <Route path="/cleansing" component={CleansingCenter} />
        </div>
      </Router>
    </Provider>
  );
}
