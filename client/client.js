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
import Home from '../components/Home'
import Projects from '../components/Projects'
import CreateOrEditProjectContainer from '../components/CreateOrEditProjectContainer'
import ProjectsOverview from '../components/ProjectsOverview'
import Login from '../components/Login'
import LoginRequired from '../components/LoginRequired'
import Loading from '../components/Loading'
import InitialDataLoaded from '../components/InitialDataLoaded'
import RouteSpecificStateReset from '../components/RouteSpecificStateReset'

// other self-written js modules
import reducer from '../redux/reducer.js'
import * as LongRunningSagas from '../redux/sagas.js'
import { getInitialDataListener, postProjectListener, updateProjectListener, loginSubmittedSaga, deleteProjectListener } from '../redux/sagas.js'

// css and images
import './lib/core/style/reset-css.scss'
import './lib/core/style/admin.scss'


// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin();

// TODO: get initial state without rendering page (loading indicator)
const initialState = {
	base: {
		title: "",
		allowedProjectTypes: ["Serie", "Film", "OVA", "OAD"],
		allowedProjectStatuses: ["Laufend", "Geplant", "Abgeschlossen", "Lizenziert", "Abgebrochen"],
		currentAddProjectCoverImg: undefined,
		currentAddProjectCoverImgValidationError: undefined,
		currentCoverImgSrc: undefined,
		user: undefined,
		logInError: "",
		lastInitialDataLoadedTimestamp: Number.MIN_VALUE,
		returnTo: "/home"
	}
}

const sagaMiddleware = createSagaMiddleware();
const baseReducer = combineReducers({
	base: reducer, 
	form: formReducer,
	routing: routerReducer
});

const store = createStore(
	baseReducer,
	initialState,
	compose(applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(LongRunningSagas.getInitialDataListener);
sagaMiddleware.run(LongRunningSagas.postProjectListener);
sagaMiddleware.run(LongRunningSagas.updateProjectListener);
sagaMiddleware.run(LongRunningSagas.loginSubmittedSaga);
sagaMiddleware.run(LongRunningSagas.deleteProjectListener);

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
					    	<Route title="Articles" path="articles" component={Projects}/>
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