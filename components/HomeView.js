import React from 'react';
import {Button, Text, View} from 'react-native';

export class HomeView extends React.Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}

const deckButton = ({deck}) => {
    return (
        <Button
            title={deck.title + ' size: ' + deck.questions.length}
            onPress={() => this.props.navigation.navigate('DeckOverView')}
        />
    )
}
