import axios from 'axios';
import React, { PropTypes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import ReactDOM from 'react-dom';
//import { string } from 'prop-types';
//import 'jquery';
import 'semantic-ui-css/semantic.min.css';
import ThinkingPicture from '../../assets/think.jpg';
import "./styles/Quiz.css"
class Quiz extends React.Component {

    state = {
        id: undefined,
        imageURL: undefined,
        question: undefined,
        choise1: undefined,
        choise2: undefined,
        choise3: undefined,
        choise4: undefined,
        userChoise: undefined,
        correctAnswer: undefined,
        isPicture: true,
        show:false
    };

    onChange = (e) => {
        const field = e.target.name;
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
            answer: this.state.userChoise
        }
        const JsonToBack = JSON.stringify(quizAnswer);
        if (!this.state.isPicture) {
            axios.post("http://tunepal.pythonanywhere.com/quiz/checkimageanswer/", JsonToBack, config)
                .then((response) => {
                    console.log(response);
                    this.setState(() => {
                        return {
                            correctAnswer: response.data
                        };
                    });
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post("http://tunepal.pythonanywhere.com/quiz/checkpssageanswer/", JsonToBack, config)
                .then((response) => {
                    console.log(response);
                    this.setState(() => {
                        return {
                            correctAnswer: response.data
                        };
                    });
                }).catch((error) => {
                    console.log(error);
                });
        }
    }

    getQuestion = () => {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        if (!this.state.isPicture) {
            axios.get('http://tunepal.pythonanywhere.com/quiz/passagequiz/', config)
                .then(res => {
                    console.log(res)
                    this.setState(() => {
                        return {
                            question: res.data[0].question,
                            imageURL: ThinkingPicture,
                            choise1: res.data[0].choices1,
                            choise2: res.data[0].choices2,
                            choise3: res.data[0].choices3,
                            choise4: res.data[0].choices4,
                            id: res.data[0].id,
                            show:true
                        };
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            axios.get('http://tunepal.pythonanywhere.com/quiz/Imagequiz/', config)
                .then(res => {
                    console.log(res)
                    this.setState(() => {
                        return {
                            question: 'Who is this artist?',
                            imageURL: res.data[0].question,
                            choise1: res.data[0].choices1,
                            choise2: res.data[0].choices2,
                            choise3: res.data[0].choices3,
                            choise4: res.data[0].choices4,
                            id: res.data[0].id,
                            show:true
                        };
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    componentDidMount() {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://tunepal.pythonanywhere.com/quiz/question/', config)
        this.getQuestion();
    }

    nextPushed = () => {
        this.setState(prevState => {
            return {
                isPicture: !prevState.isPicture,
                id: undefined,
                imageURL: undefined,
                question: undefined,
                choise1: undefined,
                choise2: undefined,
                choise3: undefined,
                choise4: undefined,
                userChoise: undefined,
                correctAnswer: undefined,
                show:false
            };
        });
        this.getQuestion();
    }
    render() {
        if(this.state.show){
            return (
                <div>
                    <form className="Quiz_form" onSubmit={this.onSubmit}>
                        
                        <img src={this.state.imageURL} className="Quiz_image" />
                        
                        <h1 className="Quiz-question">{this.state.question}</h1>
                        
                        <div style={(this.state.choise2 === this.state.correctAnswer) ? TrueStyle : {}} className="ui radio" >
                            <input
                                type="radio"
                                name="choise"
                                value={this.state.choise1}
                                onChange={this.onChange}
                            //checked={false}
                            /><span >  {this.state.choise1}</span>
                        </div>
                        <div style={(this.state.choise2 === this.state.correctAnswer) ? TrueStyle : {}} className="ui radio">
                            <input
                                type="radio"
                                name="choise"
                                value={this.state.choise2}
                                onChange={this.onChange}
                            //checked={false}
                            /><span>  {this.state.choise2}</span>
                        </div>
                        <div style={(this.state.choise3 === this.state.correctAnswer) ? TrueStyle : {}} className="ui radio">
                            <input
                                type="radio"
                                name="choise"
                                value={this.state.choise3}
                                onChange={this.onChange}
                            //checked={false}
                            /><span>  {this.state.choise3}</span>
                        </div>
                        <div style={(this.state.choise4 === this.state.correctAnswer) ? TrueStyle : {}} className="ui radio">
                            <input
                                type="radio"
                                name="choise"
                                value={this.state.choise4}
                                onChange={this.onChange}
                            //checked={false}
                            /><span>  {this.state.choise4}</span>
                        </div>
    
                        <div className="Quiz_submit-button">
                            <button className="ui left labeled icon button" type="submit">
                                <i className="icon ok" ></i>
                                submit
                            </button>
                        </div>
                    </form>
                    <div className="Quiz_next-button">
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

export default Quiz;