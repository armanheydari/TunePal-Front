import axios from 'axios';
import React from 'react';
import QuestionPicture from '../../assets/question.png'
class Quiz extends React.Component {

    state = {
        id: undefined,
        imageURL: undefined,
        question: undefined,
        choise1: undefined,
        choise2: undefined,
        choise3: undefined,
        choise4: undefined,

        correctAnswer: undefined,

        score: undefined,

        show: false,
        isSubmitted: false
    };

    onChange = (e) => {
        const newValue = e.target.value;
        this.setState(() => {
            return {
                userChoise: newValue
            };
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        const quizAnswer = {
            quiz_id: this.state.id.toString(),
            answer: e.target.value.toString()
        }
        const JsonToBack = JSON.stringify(quizAnswer);
        axios.post("http://tunepal.pythonanywhere.com/quiz/checkanswer/", JsonToBack, config)
            .then((response) => {
                this.setState(() => {
                    return {
                        correctAnswer: response.data.answer,
                        score: response.data.score,
                        isSubmitted: true
                    };
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    getQuestion = () => {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get("http://tunepal.pythonanywhere.com/quiz/quiz/", config)
            .then(res => {
                const q = res.data[0].question.split(',')
                if (q[1] === " NO" || q[1] === " https://onesoftwaresolution.com/wp-content/uploads/2017/01/iStock-147246163-900x500.jpg") {
                    q[1] = QuestionPicture;
                }
                this.setState(() => {
                    return {
                        question: q[0],
                        imageURL: q[1],
                        choise1: res.data[0].choices1,
                        choise2: res.data[0].choices2,
                        choise3: res.data[0].choices3,
                        choise4: res.data[0].choices4,
                        id: res.data[0].id,
                        show: true
                    };
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://tunepal.pythonanywhere.com/quiz/score/', config)
            .then((response) => {
                this.setState(() => {
                    return {
                        score: response.data.score
                    };
                });
            }).catch((error) => {
                console.log(error);
            });

        this.getQuestion();
    }

    nextPushed = () => {
        this.setState(prevState => {
            return {
                id: undefined,
                imageURL: undefined,
                question: undefined,
                choise1: undefined,
                choise2: undefined,
                choise3: undefined,
                choise4: undefined,
                userChoise: undefined,
                correctAnswer: undefined,
                show: false,
                isSubmitted: false
            };
        });

        this.getQuestion();
    }
    render() {
        if (this.state.show) {
            return (
                <div className="Quiz">
                    <div className="Quiz_score-time">
                        <h3 className="ui medium header">Time: 60</h3>
                        <h3 className="ui medium header">Score: {this.state.score}</h3>
                    </div>

                    <h1 className="ui large header">{this.state.question}?</h1>

                    <div>
                        <img src={this.state.imageURL} className="Quiz_image" />
                    </div>

                    <div>
                        <button className="ui inverted white button" type="submit" value={this.state.choise1} disabled={this.state.isSubmitted} style={(this.state.choise1 === this.state.correctAnswer) ? TrueStyle : {}} onClick={this.onSubmit}>{this.state.choise1.split('(')[0]}</button>
                        <button className="ui inverted white button" type="submit" value={this.state.choise2} disabled={this.state.isSubmitted} style={(this.state.choise2 === this.state.correctAnswer) ? TrueStyle : {}} onClick={this.onSubmit}>{this.state.choise2.split('(')[0]}</button>
                    </div>
                    <div>
                        <button className="ui inverted white button" type="submit" value={this.state.choise3} disabled={this.state.isSubmitted} style={(this.state.choise3 === this.state.correctAnswer) ? TrueStyle : {}} onClick={this.onSubmit}>{this.state.choise3.split('(')[0]}</button>
                        <button className="ui inverted white button" type="submit" value={this.state.choise4} disabled={this.state.isSubmitted} style={(this.state.choise4 === this.state.correctAnswer) ? TrueStyle : {}} onClick={this.onSubmit}>{this.state.choise4.split('(')[0]}</button>
                    </div>

                    <div className="Quiz_next-button-container">
                        <button type="toggle" className="ui right labeled icon button" onClick={this.nextPushed}>
                            <i className="right arrow icon"></i>
                                Next
                            </button>
                    </div>
                </div>
            );
        }
        return null;
    };
}

const TrueStyle = {
    backgroundColor: "green"
}

const FalseStyle = {
    backgroundColor: "red"
}

export default Quiz;