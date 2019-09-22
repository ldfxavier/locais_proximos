import React from 'react';
import AxiosMockAdapter from 'axios-mock-adapter';

import api from '../../src/services/api';

import { fireEvent } from '@testing-library/react-native';

const apiMock = new AxiosMockAdapter(api);

describe('Mapa', () => {
	it('verificar se pegou os resultados dos markers', () => {
		apiMock
			.onGet(
				'nearbysearch/json?key=AIzaSyCK8cz2eOQ8aTkOPEyS3EsKwYCAvNZxSJI&radius=5000&type=restaurant&location=-15.789227,-47.9093454'
			)
			.reply(200, { data: { status: 'OK' } });
	});
});

describe('Feature', () => {
	it('requests an endpoint', () => {
		apiMock
			.onPost(
				'/nearbysearch/json?key=AIzaSyCK8cz2eOQ8aTkOPEyS3EsKwYCAvNZxSJI&radius=5000&type=restaurant&location=-15.789227,-47.9093454'
			)
			.replyOnce(200, { data: { status: 'ASDASD' } });
	});
});

// import React from 'react';

// import Welcome from '../../src/pages/Welcome';

// import { render, fireEvent } from '@testing-library/react-native';

// describe('Welcome', () => {
// 	it('verificar login de usuario', () => {
// 		const { getByTestId } = render(<Welcome />);

// 		fireEvent.press(getByTestId('login'));
// 	});
// });
