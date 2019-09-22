import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './pages/Welcome';
import Mapa from './pages/Mapa';

const Router = createAppContainer(
	createStackNavigator({
		Welcome: {
			screen: Welcome,
			navigationOptions: {
				header: null,
			},
		},
		Mapa: {
			screen: Mapa,
			navigationOptions: {
				header: null,
			},
		},
	})
);

export default Router;
