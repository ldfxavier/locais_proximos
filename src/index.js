import React, {Fragment} from 'react';
import './config/reactotronConfig';
import {StatusBar} from 'react-native';

import Routers from './router';

const App = () => {
	return (
		<Fragment>
			<StatusBar backgroundColor="#04262B" barStyle="light-content" />
			<Routers />
		</Fragment>
	);
};

export default App;
