import React from 'react';

let nextCat;
let cats;

class Cats extends React.Component {
  render() {
    const selected = () => {
      if (this.props.cat_adopt) {
        return 'selected';
      } else {
        return 'unselected';
      }
    };
    if (this.props.cats.last !== null) cats = this.props.cats.first.data;
    if (this.props.cats.last === null) cats = null;
    if (cats !== null) {
      nextCat = (
        <div className={`pet-container ${selected()}`}>
          <span>Catter Name: {cats.name}</span>
          <br />
          <img src={cats.imageURL} alt="A heartwarming, picturesque cat" />
          <br />
          <div className="words-container">
            Age: {cats.age}
            <br />
          Story: {cats.story}
            <br />
          Breed: {cats.breed}
            <br />
          Gender: {cats.gender}
            <br />
          Description: {cats.description}
          </div>
          <br />
          {this.props.usersTurn && (
            <button
              className="myButton"
              onClick={() => this.props.handleCatAdopt()}
            >
              Adopt
            </button>
          )}
        </div>
      );
    }
    if (cats === null) {
      nextCat = (
        <div className={`pet-container ${selected()}`}>
          <h3>No more cats available for adoption!</h3>
        </div>
      );
    }
    return <>{nextCat}</>;
  }
}

export default Cats;
