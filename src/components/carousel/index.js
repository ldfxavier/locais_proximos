import React, { Component } from 'react';

import { Dimensions } from 'react-native';
import CarouselView from 'react-native-snap-carousel';

import { token_google } from '../../config/config';

import { Text, Title, Container, CardCarousel, ImageLocal } from './styles';

const { width, height } = Dimensions.get('window');

function wp(percentage) {
	const value = (percentage * width) / 100;
	return Math.round(value);
}
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class carousel extends Component {
	renderItem({ item }) {
		return (
			<CardCarousel>
				{item.photos != undefined ? (
					<ImageLocal
						source={{
							uri:
								'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
								item.photos[0].photo_reference +
								'&sensor=false&maxheight=200&maxwidth=200&key=' +
								token_google,
						}}
					/>
				) : null}
				<Title>{item.name}</Title>
				{item.photos != undefined ? null : <Text>{item.vicinity}</Text>}
			</CardCarousel>
		);
	}
	render() {
		return (
			<Container>
				<CarouselView
					data={this.props.locations}
					renderItem={this.renderItem}
					sliderWidth={width}
					itemWidth={slideWidth}
					onBeforeSnapToItem={item => {
						this.props.region({
							longitude: this.props.locations[item].geometry
								.location.lng,
							latitude: this.props.locations[item].geometry
								.location.lat,
							latitudeDelta: 0.00522,
							longitudeDelta: (width / height) * 0.00522,
						});
					}}
				/>
			</Container>
		);
	}
}
