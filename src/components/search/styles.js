import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

const { height } = Dimensions.get('window');

export const Container = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 30px;
`;

export const ContainerSearch = styled.View`
	flex-direction: row;
	padding: 5px 0px;
	margin-bottom: 10px;
`;

export const Input = styled.TextInput`
	flex: 1;
`;

export const IconContainer = styled.TouchableOpacity`
	padding: 5px 0px;
	justify-content: center;
	align-items: center;
`;

export const FlatList = styled.FlatList`
	border-top-width: 0.5px;
	border-top-color: ${colors.primary};
	padding-top: 15px;
`;

export const CardFlatlist = styled.TouchableOpacity``;

export const Title = styled.Text`
	font-size: 16px;
	color: ${colors.primary};
	font-weight: bold;
`;
