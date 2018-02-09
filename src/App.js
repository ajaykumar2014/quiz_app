import React, { Component } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      userAnswer: [],
      result: '',
      QuizQuestions:[],
      selectedOption:{},
      answer:-1
    };
    
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.onAnswerSubmitted = this.onAnswerSubmitted.bind(this);
  }
  fetchQuestionListFromServer(){
    console.log("one")
    fetch('http://localhost:7777/quiz/questions',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(response=>{
     if(response.ok){
       response.json().then(jsonRes=>{
          console.log(jsonRes)
          this.setState({QuizQuestions:jsonRes})
          this.setFirstQuestion();
       })
     }
    } 
    )
  }

  setFirstQuestion(){
    console.log("two")
    this.setState({
      question: this.state.QuizQuestions[0].question,
      answerOptions: this.state.QuizQuestions[0].answers,
      questionId : this.state.QuizQuestions[0].id,
    });
  }
 
  componentWillMount() {
    this.fetchQuestionListFromServer();
  }

  onAnswerSubmitted(event){
    this.setUserAnswer();
    if (this.state.questionId < this.state.QuizQuestions.length) {
      this.setNextQuestion()
    } else {
      this.getResults();
    }
  }
  handleAnswerSelected(event) {
    var selectedAnswer ={}
    selectedAnswer.questionId = this.state.questionId;
    selectedAnswer.anwerId=event.currentTarget.value;
    selectedAnswer = JSON.stringify(selectedAnswer)
   // console.log("selectedAnswer :"+JSON.stringify(selectedAnswer))
    
    this.setState({
      selectedOption:selectedAnswer,
      answer:event.currentTarget.value
    },()=>{
      console.log(this.state.selectedOption+ "OnChange Event :"+this.state.answer)
    })
    
  }

  setUserAnswer() {
    this.setState({
        userAnswer:this.state.userAnswer.concat(this.state.selectedOption),
        answersCount: this.state.answersCount+1,
        answer: this.state.selectedOption.anwerId
    },()=>{
      console.log("Moving to Next Question No. "+this.state.questionId)
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.QuizQuestions[counter].question,
        answerOptions: this.state.QuizQuestions[counter].answers,
        answer: -1
    });
    console.log(" User Answer is "+this.state.userAnswer)
  }

  getResults() {
    console.log(" Put Data is "+this.state.userAnswer)
    fetch('http://localhost:7777/quiz/score',{
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body:'['+this.state.userAnswer+']'
    }).then((res)=>{
      if(res.ok){
        res.json().then(resJson=>{
        console.log("User Score is "+resJson.correctAnswer)  
        if(resJson.correctAnswer === 0 ){
          this.setState({result:" Zero"})
        }else{
        this.setState({
          result:resJson.correctAnswer
        })
      }
      })
     }
    });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.QuizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onAnswerSubmitted={this.onAnswerSubmitted}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </div>
        result is {this.state.result}
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
