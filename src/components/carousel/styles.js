import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
	position: absolute;
	padding: 10px;
	bottom: 0;
	background-color: ${colors.primary};
`;

export const CardCarousel = styled.View`
	background-color: #fff;
	border-radius: 3px;
`;

export const ImageLocal = styled.Image.attrs({
	resizeMode: 'cover',
})`
	height: 110px;
	border-radius: 3px;
`;

export const Title = styled.Text.attrs({
	numberOfLines: 1,
})`
	color: ${colors.primary};
	text-align: center;
	font-weight: bold;
	border-radius: 5px;
	padding: 5px;
	font-size: 16px;
`;

export const Text = styled.Text`
	color: ${colors.primary};
	text-align: center;
	margin-top: 5px;
`;
