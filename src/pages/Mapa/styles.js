import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { colors } from '../../styles/colors';

const { width, height } = Dimensions.get('window');

export const Maps = styled(MapView)`
	flex: 1;
	justify-content: flex-end;
	padding: 30px;
`;

export const Container = styled.View`
	flex: 1;
	justify-content: flex-end;
`;

export const ContainerButton = styled.View`
	position: absolute;
	bottom: 180px;
	right: 10px;
	flex-direction: column;
`;

export const Button = styled.TouchableOpacity.attrs({
	elevation: 3,
})`
	width: 40px;
	height: 40px;
	margin-bottom: 10px;
	border-radius: 20px;
	background-color: #fff;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 1px 5px #333;
`;

export const SearchContainer = styled(Animated.View)`
	flex: 1;
	position: absolute;
	width: ${width};
	height: ${height};
	z-index: 1;
`;

export const Search = styled.View`
	position: absolute;
	top: 30;
	flex-direction: row;
	background-color: #fff;
	border-radius: 15px;
	margin: 0px 30px 0px 30px;
	padding: 5px 15px;
`;

export const Input = styled.TextInput`
	flex: 1;
`;

export const IconSearch = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`;

export const Callout = styled(MapView.Callout)`
	border-radius: 3px;
	width: 200px;
`;

export const Marker = styled.View`
	width: 35px;
	height: 35px;
	border-radius: 17.5px;
	border: 4px solid ${colors.primary};
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;

export const IconMarker = styled.Image`
	width: 20px;
	height: 20px;
`;

export const Title = styled.Text`
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

export const BackgroundCarousel = styled.View`
	padding: 10px 0 10px 0;
	background-color: ${colors.primary};
`;

export const CardCarousel = styled.TouchableOpacity`
	background-color: #fff;
	height: 150px;
	padding: 30px;
	border-radius: 10px;
`;
