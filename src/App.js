import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from './components/Register';
import { logout, authCheckState } from './actions/users';

function App(props) {
  const { token, onLogout, onTryAutoSignup } = props;

  React.useEffect(() => {
    onTryAutoSignup();
  }, [token]);
  return (
    <div>
      <Header token={token} onLogout={onLogout} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  onTryAutoSignup: () => dispatch(authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
