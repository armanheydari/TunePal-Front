import axios from 'axios';
import React, { PropTypes } from 'react';
import ProfilePicture from '../../assets/maxresdefault.jpg';
//import ReactDOM from 'react-dom';
//import { string } from 'prop-types';
//import 'jquery';
import 'semantic-ui-css/semantic.min.css';

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
        isPicture: true
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
            answer: this.state.userChoise.toString()
        }
        const JsonToBack = JSON.stringify(quizAnswer);
        const a1 = axios.post("http://tunepal.pythonanywhere.com/quiz/checkimageanswer/", JsonToBack, config)
            // .then((response) => {
            //     alert("The file is successfully uploaded");
            //     console.log(response);
            //     this.setState(() => {
            //         return {
            //             correctAnswer: response.data.answer
            //         };
            //     });
            // }).catch((error) => {
            //     console.log(error);
            // });
            console.log(a1)
    }

    getQuestion=()=> {
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
                            choise1: res.data[0].choices1,
                            choise2: res.data[0].choices2,
                            choise3: res.data[0].choices3,
                            choise4: res.data[0].choices4,
                            id: res.data[0].id,
                            //isPicture:!this.state.isPicture
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
                        imageURL:res.data[0].question,
                        choise1: res.data[0].choices1,
                        choise2: res.data[0].choices2,
                        choise3: res.data[0].choices3,
                        choise4: res.data[0].choices4,
                        id: res.data[0].id
                    };
                });
            })
            .catch(err => {
                console.log(err)
            });
            //console.log(a)
            console.log('heloooo')
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

    nextPushed=()=>{
        // this.setState(prevState => {
        //     return {
        //         isPicture:!prevState.isPicture
        //     };
        // });
        this.getQuestion();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>{this.state.question}</h1>
                    {this.state.isPicture ? <img src={this.state.imageURL}></img> : <div/>}
                    <div style={(this.state.choise1 === this.state.correctAnswer) ? TrueStyle : {}}>
                        <input
                            type="radio"
                            name="choise"
                            value={this.state.choise1}
                            onChange={this.onChange}
                        /><span>{this.state.choise1}</span>
                    </div>
                    <div style={(this.state.choise2 === this.state.correctAnswer) ? TrueStyle : {}}>
                        <input
                            type="radio"
                            name="choise"
                            value={this.state.choise2}
                            onChange={this.onChange}
                        /><span>{this.state.choise2}</span>
                    </div>
                    <div style={(this.state.choise3 === this.state.correctAnswer) ? TrueStyle : {}}>
                        <input
                            type="radio"
                            name="choise"
                            value={this.state.choise3}
                            onChange={this.onChange}
                        /><span>{this.state.choise3}</span>
                    </div>
                    <div style={(this.state.choise4 === this.state.correctAnswer) ? TrueStyle : {}}>
                        <input
                            type="radio"
                            name="choise"
                            value={this.state.choise4}
                            onChange={this.onChange}
                        /><span>{this.state.choise4}</span>
                    </div>
                    <button type="submit">
                        submit
                    </button>
                    <button onClick={this.nextPushed}>
                        next
                    </button>

                </form>
            </div>
        );
    };
}

const TrueStyle = {
    backgroundColor: "green"
}

export default Quiz;