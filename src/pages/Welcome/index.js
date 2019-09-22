import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { LoginManager } from 'react-native-fbsdk';

import { Container, Title, LoginButton, Text } from './styles';

export default class Welcome extends Component {
	/*
	 ** Método para fazer login pela API do facebook
	 */
	userLogin = () => {
		let navigation = this.props.navigation;
		LoginManager.logInWithPermissions(['public_profile']).then(
			function(result) {
				if (result.isCancelled) {
					console.tron.log('Login cancelado');
				} else {
					navigation.navigate('Mapa');
				}
			},
			function(error) {
				console.tron.log('Falha ao logar: ' + error);
			}
		);
	};
	render() {
		return (
			<Container>
				<Title>Olá!</Title>
				<Title>Seja bem vindo!</Title>
				<Text>Faça seu login e vamos começar!</Text>
				<LoginButton testID="login" onPress={() => this.userLogin()}>
					<Icon name="sc-facebook" size={35} color="#04262b" />
				</LoginButton>
			</Container>
		);
	}
}
