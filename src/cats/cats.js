import React from 'react';

class Cats extends React.Component {
  render() {
    const selected = () => {
      if (this.props.cat_adopt) {
        return 'selected';
      } else {
        return 'unselected';
      }
    };
    const cats = this.props.cats.first.data;
    const nextCat = (
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
    return <>{nextCat}</>;
  }
}

export default Cats;
