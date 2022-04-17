import './App.css';
import { Header, Hero, Home } from './components/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Hero />
        </Route>
        <Route exact path="/channels">
          <Home />
        </Route>
        <Route exact path="/channels/:id">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;