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
        choisePushed: undefined,
        correctAnswer: undefined,
        firstScore: undefined,
        score: undefined,
        show: false,
        isSubmitted: false,
        isTimer: true,
        seconds: 60
    };

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
                        firstScore: response.data.score,
                        score: response.data.score
                    };
                });
            }).catch((error) => {
            });
        this.getQuestion();
    }

    render() {
        if (this.state.show) {
            if (this.state.seconds >= 0) {
                return (
                    <div className="Quiz">
                        <div className="Quiz_score-time-container">
                            <span className="Quiz_header" style={(this.state.seconds <= 10) ? lastSecondsStyle : {}}>{this.state.seconds}</span>
                            <span className="Quiz_header">Score: {this.state.score}</span>
                        </div>
                        <div>
                            <span className="ui large header">{this.state.question}?</span>
                        </div>
                        <div>
                            <img src={this.state.imageURL} alt="" className="Quiz_image" />
                        </div>
                        <div className="Quiz_button-row">
                            <button
                                className="ui inverted white button"
                                type="submit"
                                value={this.state.choise1}
                                disabled={this.state.isSubmitted}
                                style={(this.state.choise1 === this.state.correctAnswer) ? TrueStyle : (this.state.choise1 === this.state.choisePushed) ? FalseStyle : {}}
                                onClick={this.onSubmit}>
                                {this.state.choise1.split('(')[0]}
                            </button>
                            <button
                                className="ui inverted white button"
                                type="submit"
                                value={this.state.choise2}
                                disabled={this.state.isSubmitted}
                                style={(this.state.choise2 === this.state.correctAnswer) ? TrueStyle : (this.state.choise2 === this.state.choisePushed) ? FalseStyle : {}}
                                onClick={this.onSubmit}>
                                {this.state.choise2.split('(')[0]}
                            </button>
                        </div>
                        <div className="Quiz_button-row">
                            <button
                                className="ui inverted white button"
                                type="submit"
                                value={this.state.choise3}
                                disabled={this.state.isSubmitted}
                                style={(this.state.choise3 === this.state.correctAnswer) ? TrueStyle : (this.state.choise3 === this.state.choisePushed) ? FalseStyle : {}}
                                onClick={this.onSubmit}>
                                {this.state.choise3.split('(')[0]}
                            </button>
                            <button
                                className="ui inverted white button"
                                type="submit"
                                value={this.state.choise4}
                                disabled={this.state.isSubmitted}
                                style={(this.state.choise4 === this.state.correctAnswer) ? TrueStyle : (this.state.choise4 === this.state.choisePushed) ? FalseStyle : {}}
                                onClick={this.onSubmit}>
                                {this.state.choise4.split('(')[0]}
                            </button>
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
            else {
                return (
                    <div className="Quiz">
                        <h1 className="ui text">Time's Upppp!</h1>
                        <h1 className="ui text">You got {this.state.score - this.state.firstScore} points!</h1>
                    </div>
                )
            }
        }
        return (
            <div className="Quiz_load">
                <div className="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    };

    onSubmit = (e) => {
        clearInterval(this.myInterval)
        e.preventDefault();
        const temp = e.target.value
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        const quizAnswer = {
            quiz_id: this.state.id.toString(),
            answer: temp.toString()
        }
        const JsonToBack = JSON.stringify(quizAnswer);
        axios.post("http://tunepal.pythonanywhere.com/quiz/checkanswer/", JsonToBack, config)
            .then((response) => {
                this.setState(() => {
                    return {
                        correctAnswer: response.data.answer,
                        score: response.data.score,
                        choisePushed: temp,
                        isSubmitted: true
                    };
                });
            }).catch((error) => {
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
            });
        this.myInterval = setInterval(() => {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }, 1000)
    }

    nextPushed = () => {
        clearInterval(this.myInterval)
        this.setState(prevState => {
            return {
                id: undefined,
                imageURL: undefined,
                question: undefined,
                choise1: undefined,
                choise2: undefined,
                choise3: undefined,
                choise4: undefined,
                choisePushed: undefined,
                correctAnswer: undefined,
                show: false,
                isSubmitted: false,
                isTimer: false
            };
        });

        this.getQuestion();
    }
}

const TrueStyle = {
    backgroundColor: "green"
}

const FalseStyle = {
    backgroundColor: "red"
}

const lastSecondsStyle = {
    color: "#fc5c9c",
    fontSize: "7rem",
}

export default Quiz;