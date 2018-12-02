import React from "react";
import {getDeck} from "../utils/api";
import {Button, Text, View} from "react-native";

export default class QuizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            correct: 0,
            indexAt: 0,
            showQuestion: true,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const deckID = navigation.getParam('deckID', '');
        getDeck(deckID).then((deck) => {
                const questions = JSON.parse(deck).questions;
                this.shuffleQuestions(questions);
                this.setState({questions: questions});
            }
        );
    }

    render() {
        if(this.state.questions === null || this.state.questions === undefined) {
            return null;
        } else if(this.state.questions.length === 0) {
            return (<View><Text>There is no question in this deck :(</Text></View>);
        } else if (this.state.questions.length !== this.state.indexAt) {
            const question = this.state.questions[this.state.indexAt];
            return (
                <View>
                    <Text>
                        Your Progress {this.state.indexAt+1} of {this.state.questions.length}
                    </Text>
                    <Text>
                        {this.state.showQuestion ? question.question : question.answer}
                    </Text>
                    <Button
                        title={this.state.showQuestion ? 'Show Answer' : 'Show Question'}
                        onPress={this.flipCard}
                    />
                    <Button
                        title={'Correct'}
                        onPress={this.markAsCorrect}
                    />
                    <Button
                        title={'Incorrect'}
                        onPress={this.progressOneQuestion}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Text>
                        That's the end of this deck!
                    </Text>
                    <Text>
                        Score: You have answered {Math.round(((this.state.correct)/this.state.questions.length)*100)}% Correct!
                    </Text>
                    <Button
                        title={'Restart Quiz'}
                        onPress={() => {
                            this.shuffleQuestions(this.state.questions);
                            this.setState({
                                correct: 0,
                                indexAt: 0,
                                showQuestion: true,
                            });
                        }}
                    />
                    <Button
                        title={'Back to Deck'}
                        onPress={() => {
                            this.props.navigation.navigate('DeckOverview', {
                                deckID: this.props.navigation.getParam('deckID', ''),
                            });
                        }}
                    />
                </View>
            );
        }
    }

    flipCard = () => {
        this.setState(prevState => ({
            showQuestion: !prevState.showQuestion,
            correct: prevState.correct,
            indexAt: prevState.indexAt,
            questions: prevState.questions,
        }));
    }

    shuffleQuestions = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    markAsCorrect = () => {
        this.setState(prevState => ({
            correct: prevState.correct+1,
            indexAt: prevState.indexAt+1,
            questions: prevState.questions,
            showQuestion: true,
        }));
    }

    progressOneQuestion = () => {
        this.setState(prevState => ({
            indexAt: prevState.indexAt+1,
            showQuestion: true,
            correct: prevState.correct,
            questions: prevState.questions,
        }));
    }
}
