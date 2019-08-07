import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Wrapper from "./components/Wrapper";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import snowflakes from "./snowflakes.json"

class App extends Component {
    state = {
      clicked: [],
      score: 0,
      highscore: 0,
      gameMessage: "",
      messageClass: ""
    };

componentDidMount() {
    this.setState({
        gameMessage: "Click an image to begin!",
    });
};

handleClick = (event) => {
  this.setState({
    //Add the div's alt value to the clicked array
    clicked: [...this.state.clicked, event.target.alt]
  });
  //If the name is already in the clicked array set score back to 0 and empty clicked array
  if (this.state.clicked.includes(event.target.alt)) {
    this.setState({
      gameMessage: "You guessed incorrectly!",
      score: 0,
      clicked: [],
      messageClass: "incorrect"
    });
  } else {
    //If the name is not in the clicked array, add 1 to the current score
    this.setState({
      gameMessage: "You guessed correctly!",
      score: this.state.score + 1,
      highscore: Math.max(this.state.score + 1),
      messageClass: "correct"
    })
  };
  this.setHighScore();
  this.shuffleArray(snowflakes);
};

shuffleArray(snowflakes) {
  for (let i = snowflakes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [snowflakes[i], snowflakes[j]] = [snowflakes[j], snowflakes[i]];
  };
};

setHighScore(){
  let newScore = this.state.score;
  let newHighScore = this.state.highscore
  if(newHighScore > newScore){
    this.setState({
        highscore: newHighScore
    })
  }
}

render() {
    return (
      <Wrapper>
        <NavBar
          messageClass={this.state.messageClass === "incorrect" ? "incorrect" : this.state.messageClass === "correct" ? "correct" : ""}
          gameMessage={this.state.gameMessage}
          score={this.state.score}
          highscore={this.state.highscore}
        />
        <Jumbotron />
        <div className="container">
          <div className="row">
            {snowflakes.map(snowflake => (
              <Card
                className={this.state.score === 0 ? "card shake" : "card"}
                key={snowflake.id}
                name={snowflake.name}
                image={snowflake.image}
                handleClick={this.handleClick}
              ></Card>
            ))}
          </div>
        </div>
      </Wrapper>
    );
  };
};

export default App;
