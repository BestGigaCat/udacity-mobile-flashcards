import React from "react";
import {Button, Text, TextInput, View} from "react-native";
import {addCard} from "../utils/api";

export default class AddCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
        }
    }

    render() {
        const { navigation } = this.props;
        const deckID = navigation.getParam('deckID', '');
        return (
            <View>
                <Text>
                    What is the title of your new deck?
                </Text>
                <Text>Question: </Text>
                <TextInput
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                    editable={true}
                 />
                <Text>Answer: </Text>
                <TextInput
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                    editable={true}
                />
                <Button
                    title={'Submit'}
                    disabled={this.state.answer === '' || this.state.question === ''}
                    onPress={() => {
                        addCard(deckID, {
                            question: this.state.question,
                            answer: this.state.answer,
                        });
                        navigation.navigate('Home');
                    }}
                />
            </View>
        );
    }
}
