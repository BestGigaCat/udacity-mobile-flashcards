import React from "react";
import {Button, Text, View} from "react-native";
import {getDeck} from "../utils/api";
import {clearNotification, setNotification} from "../utils/helpers";

export default class DeckOverviewScreen extends React.Component {
    state = {
        deck: null,
    }

    componentDidMount() {
        const {navigation} = this.props;
        const deckID = navigation.getParam('deckID', '');
        getDeck(deckID).then((deck) => {this.setState({deck: JSON.parse(deck)})});
    }

    static navigationOptions = {
        title: 'Deck Overview',
    };

    render() {
        const {navigation} = this.props;
        const deckID = navigation.getParam('deckID', '');
        if (this.state.deck) {
            return (
                <View>
                    <Text>Title: {this.state.deck.title}</Text>
                    <Text>Size: {this.state.deck.questions.length}</Text>
                    <Button
                        title={'add cards'}
                        onPress={() => {
                            navigation.navigate('AddCardScreen', {
                                deckID: deckID,
                            });
                        }}
                    />
                    <Button
                        title={'start quiz'}
                        onPress={() => {
                            navigation.navigate('QuizScreen', {
                                deckID: deckID,
                            });
                            this.resetNotification();
                        }}
                    />
                </View>
            );
        } else {
            return null;
        }
    }

    resetNotification() {
        clearNotification().then(setNotification);
    }
}
