import React from 'react';

let nextPup;
let dogs;

class Dogs extends React.Component {
  render() {
    const selected = () => {
      if (this.props.dog_adopt) {
        return 'selected';
      } else {
        return 'unselected';
      }
    };
    if (this.props.dogs.last !== null) dogs = this.props.dogs.first.data;
    if (this.props.dogs.last === null) dogs = null;

    if (dogs !== null) {
      dogs = this.props.dogs.first.data;
      nextPup = (
        <div className={`pet-container ${selected()}`}>
          <span>Pupper Name: {dogs.name}</span>
          <br />
          <img src={dogs.imageURL} alt="A heartwarming, picturesque dog" />
          <br />
          <div className="words-container">
            Age: {dogs.age}
            <br />
          Story: {dogs.story}
            <br />
          Breed: {dogs.breed}
            <br />
          Gender: {dogs.gender}
            <br />
          Description: {dogs.description}
          </div>
          <br />
          {this.props.usersTurn && (
            <button
              className="myButton"
              type="button"
              onClick={() => this.props.handleDogAdopt()}
            >
              Adopt
            </button>
          )}
        </div>
      );
    }
    if (dogs === null) {
      nextPup = (
        <div className={`pet-container ${selected()}`}>
          <h3>No more dogs available for adoption!</h3>
        </div>
      );
    }
    return <>{nextPup}</>;
  }
}

export default Dogs;
