import React from 'react';
import Header from '../header/header';
import Dogs from '../dogs/dogs';
import Cats from '../cats/cats';
import People from '../people/people';
import ApiHelpers from '../helpers/api_helpers';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import randomPet from '../randomize/randomPet';
import randomPerson from '../randomize/randomPerson';

import './root.css';


class Root extends React.Component {
  state = {
    dogs: { first: { data: {}, next: {} } },
    cats: { first: { data: {}, next: {} } },
    dog_adopt: false,
    cat_adopt: false,
    personListUpdated: false,
    usersTurn: false,
    adoptionStatus: ''
  };

  handleDogAdopt = () => {
    this.setState({ dog_adopt: !this.state.dog_adopt });
  };

  handleCatAdopt = () => {
    this.setState({ cat_adopt: !this.state.cat_adopt });
  };

  handleUpdatePeopleList = () => {
    this.setState({ personListUpdated: !this.state.personListUpdated });
  };

  handleUpdateUsersTurn = async () => {
    await this.setState({ usersTurn: true });
  };

  //Issues to fix,
  /**
   * 
   * It selects pet for user...
   * 
   */

  handleStartDemo = (time = 6500) => {
    //demo run
    for (let i = 0; i < 20; i++) {

      //Stops users listings when no more pets but only tested with empty list
      if (this.state.usersTurn !== true) {
        setTimeout(() => {

          //random picks pet for person
          let pet = randomPet();
          if (pet === 'cat') {
            if (this.state.cats.last === null) {
              this.handleDogAdopt();
            }
            if (this.state.cats.last !== null) {
              this.handleCatAdopt();
            }
          }
          if (pet === 'dog') {
            if (this.state.dogs.last === null) {
              this.handleCatAdopt();
            }
            if (this.state.dogs.last !== null) {
              this.handleDogAdopt();
            }
          }

          //deletes pet from list after adoption
          setTimeout(() => {
            this.handleAdoptSubmit();
          }, 1500);
        }, time);

        //adds a person to list
        setTimeout(() => {
          randomPerson();
          this.setState({ personListUpdated: true });
        }, time += 6500);
      }
    }
  };

  async handleAdoptSubmit() {
    const usersTurn = this.state.usersTurn;
    if (this.state.cat_adopt === true) {
      if (usersTurn) {
        this.setState({
          adoptionStatus: `Contrats! You adopted ${this.state.cats.first.data.name}!`
        })
      }
      await ApiHelpers.deleteCat();
      this.setState({ cat_adopt: false, usersTurn: false });
      this.getCats();
    }
    if (this.state.dog_adopt === true) {
      if (usersTurn) {
        this.setState({
          adoptionStatus: `Contrats! You adopted ${this.state.dogs.first.data.name}!`
        })
      }
      await ApiHelpers.deleteDog();
      this.setState({ dog_adopt: false, usersTurn: false });
      this.getDogs();
    }
    await ApiHelpers.deletePerson();
    this.handleUpdatePeopleList();
  }

  async getDogs() {
    let res = await ApiHelpers.getDogs();
    this.setState({
      dogs: res,
    });
  }

  async getCats() {
    let res = await ApiHelpers.getCats();
    this.setState({
      cats: res,
    });
  }

  componentDidMount() {
    this.getDogs();
    this.getCats();
  }

  render() {
    return (
      <>
        <Header />
        <hr />

        <main>
          <div className="pets-section">
            <Route
              path="/adopt"
              render={(props) => (
                <People
                  {...props}
                  personListUpdated={this.state.personListUpdated}
                  handleUpdatePeopleList={this.handleUpdatePeopleList}
                  handleUpdateUsersTurn={this.handleUpdateUsersTurn}
                  handleStartDemo={this.handleStartDemo}
                />
              )}
            />
            <section>
              <Route
                exact
                path="/"
                render={(props) => <LandingPage {...props} />}
              />
              <Route
                path="/adopt"
                render={(props) => (
                  <Dogs
                    {...props}
                    handleDogAdopt={this.handleDogAdopt}
                    dogs={this.state.dogs}
                    usersTurn={this.state.usersTurn}
                    dog_adopt={this.state.dog_adopt}
                  />
                )}
              />
              <Route
                path="/adopt"
                render={(props) => (
                  <Cats
                    {...props}
                    handleCatAdopt={this.handleCatAdopt}
                    cats={this.state.cats}
                    usersTurn={this.state.usersTurn}
                    cat_adopt={this.state.cat_adopt}
                  />
                )}
              />
            </section>
            <br />
          </div>
          {this.state.usersTurn &&
            (this.state.dog_adopt || this.state.cat_adopt) && (
              <div className="button-wrapper">
                <button
                  className="myButton"
                  onClick={() => this.handleAdoptSubmit()}
                >
                  Ready to Adopt
                </button>
              </div>
            )}
          <hr />
          {<h2>{this.state.adoptionStatus}</h2>}
        </main>
      </>
    );
  }
}

export default Root;
