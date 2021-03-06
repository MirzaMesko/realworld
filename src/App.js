import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from './components/Register';
import SingleArticle from './components/SingleArticle';
import Profile from './components/Profile';
import Settings from './components/Settings';
import CreateArticle from './components/CreateArticle';
import { logout, authCheckState, getProfile } from './actions/users';
import { getArticles, getTags } from './actions/articles';

function App(props) {
  const { token, onLogout, onTryAutoSignup, onGetArticles, onGetTags, user, onGetProfile } = props;

  React.useEffect(() => {
    onTryAutoSignup();
    onGetArticles();
    onGetTags();
  }, [token]);
  return (
    <div>
      <Header token={token} onLogout={onLogout} user={user} onGetArticle={onGetArticles} onGetProfile={onGetProfile} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/@:id" component={Profile} />
        <Route exact path="/@:id/favorited" component={Profile} />
        <Route path="/article/:id" component={SingleArticle} />
        <Route path="/editor" component={CreateArticle} />
        <Route path="/settings" >
          <Settings onLogout={onLogout} token={token}/>
        </Route>
        <Route path="/yourFeed" component={Home} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  articles: state.users.articles,
  user: state.users.user
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  onTryAutoSignup: () => dispatch(authCheckState()),
  onGetArticles: (param) => dispatch(getArticles(param)),
  onGetTags: () => dispatch(getTags()),
  onGetProfile: (username) => dispatch(getProfile(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
