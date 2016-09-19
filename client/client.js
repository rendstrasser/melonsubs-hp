import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { Router, NotFoundRoute, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { reducer as formReducer } from 'redux-form'

// components
import App from './app/components/App'
import Home from './home/components/Home'

import Projects from './projects/components/Projects'
import CreateOrEditProjectContainer from './projects/components/CreateOrEditProjectContainer'
import ProjectsOverview from './projects/components/ProjectsOverview'

import Articles from './articles/components/Articles'
import CreateOrEditArticleContainer from './articles/components/CreateOrEditArticleContainer'
import ArticlesOverview from './articles/components/ArticlesOverview'

import Login from './app/components/Login'
import LoginRequired from './app/components/LoginRequired'
import Loading from './app/components/Loading'
import InitialDataLoaded from './app/components/InitialDataLoaded'
import RouteSpecificStateReset from './app/components/RouteSpecificStateReset'

// other self-written js modules
import appReducer from './app/reducer'
import projectsReducer from './projects/reducer'
import articlesReducer from './articles/reducer'
import * as AppSagas from './app/sagas'
import * as ProjectSagas from './projects/sagas'
import * as ArticleSagas from './articles/sagas'

// css and images
import './lib/core/style/reset-css.scss'
import './lib/core/style/admin.scss'


// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin();

const initialState = {
	app: {
		title: "",
		allowedProjectTypes: ["Serie", "Film", "OVA", "OAD"],
		allowedProjectStatuses: ["Laufend", "Geplant", "Abgeschlossen", "Lizenziert", "Abgebrochen"],
		user: undefined,
		logInError: "",
		lastInitialDataLoadedTimestamp: Number.MIN_VALUE,
		returnTo: "/home",
		basicRouteSpecificState: {
			imageUpload: {},
			mediaUpload: {},
			popup: {}
		}
	},
	projects: {
		elements: []
	},
	articles: {
		elements: []
	}
}

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
	app: appReducer,
	projects: projectsReducer,
	articles: articlesReducer,
	form: formReducer,
	routing: routerReducer
});

const store = createStore(
	reducer,
	initialState,
	compose(applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(AppSagas.getInitialDataListener);
sagaMiddleware.run(AppSagas.loginListener);
sagaMiddleware.run(ProjectSagas.createProjectListener);
sagaMiddleware.run(ProjectSagas.updateProjectListener);
sagaMiddleware.run(ProjectSagas.deleteProjectListener);
sagaMiddleware.run(ArticleSagas.createArticleListener);
sagaMiddleware.run(ArticleSagas.updateArticleListener);
sagaMiddleware.run(ArticleSagas.deleteArticleListener);

const history = syncHistoryWithStore(browserHistory, store)

const routeSpecificStateResetOnEnterHandler = RouteSpecificStateReset.requireRouteSpecificStateResetOnEnter(store);
const routeSpecificStateResetOnChangeHandler = RouteSpecificStateReset.requireRouteSpecificStateResetOnChange(store);
const initialDataLoadedOnEnterHandler = InitialDataLoaded.requireInitialDataLoadedOnEnter(store);
const initialDataLoadedOnChangeHandler = InitialDataLoaded.requireInitialDataLoadedOnChange(store);
const loginRequiredOnEnterHandler = LoginRequired.requireAuthenticatedOnEnter(store);
const loginRequiredOnChangeHandler = LoginRequired.requireAuthenticatedOnChange(store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route title="Login" path="/login" component={Login}/>
			<Route title="Loading" path="/loading" component={Loading}/>
			<Route component={RouteSpecificStateReset} onEnter={routeSpecificStateResetOnEnterHandler} onChange={routeSpecificStateResetOnChangeHandler}>
				<Route component={InitialDataLoaded} onEnter={initialDataLoadedOnEnterHandler} onChange={initialDataLoadedOnChangeHandler}>
					<Route component={LoginRequired} onEnter={loginRequiredOnEnterHandler} onChange={loginRequiredOnChangeHandler}>
						<Route path="/" component={App}>
							<IndexRedirect to="/home"/>
							<Route title="Home" path="home" component={Home}/>
					    	<Route path="projects" component={Projects}>
					    		<IndexRoute title="Projects Overview" component={ProjectsOverview}/>
					    		<Route title="Manage project" path="set(/:id)" component={CreateOrEditProjectContainer}/>
					    	</Route>
					    	<Route path="articles" component={Articles}>
					    		<IndexRoute title="Articles Overview" component={ArticlesOverview}/>
					    		<Route title="Manage article" path="set(/:id)" component={CreateOrEditArticleContainer}/>
					    	</Route>
					    	<Route title="Members" path="members" component={Projects}/>
					    	<Route title="Settings" path="settings" component={Projects}/>
					    </Route>
				    </Route>
			    </Route>
		    </Route>
	    </Router>
  	</Provider>,
	document.getElementById('app')
)