import React from "react";
import {Button, Text, TextInput, View} from "react-native";
import {addDeck} from "../utils/api";

export default class AddDeckScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }

    render() {
        return (
            <View>
                <Text>
                    What's the title of your new deck?
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                    editable={true}
                />
                <Button
                    title={'Submit'}
                    disabled={this.state.title === ''}
                    onPress={() => {
                        addDeck(this.state.title);
                        this.props.navigation.navigate('DeckOverview', {
                            deckID: this.state.title,
                        });
                    }}
                />
            </View>
        )
    }
}
