import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 30px;
	background-color: #04262b;
`;

export const Title = styled.Text`
	color: #93db9a;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`;

export const Text = styled.Text`
	color: #93db9a;
	text-align: center;
	font-size: 16px;
	margin-top: 20px;
`;

export const LoginButton = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background-color: #93db9a;
	margin-top: 20px;
	justify-content: center;
	align-items: center;
`;
