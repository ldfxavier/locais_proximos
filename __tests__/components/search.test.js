import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Search from '../../src/components/search';

describe('Testando component Search', () => {
	it('Testando resultado da busca', () => {
		const { getByTestId } = render(<Search />);

		fireEvent.changeText(getByTestId('search-input'), 'outback');
		expect(getByTestId('search-input')).toHaveProp('value', 'outback');
	});
});
