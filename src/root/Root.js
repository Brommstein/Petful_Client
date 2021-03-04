import React from 'react';
import Header from '../header/header';
import Dogs from '../dogs/dogs';
import Cats from '../cats/cats';
import People from '../people/people';
import ApiHelpers from '../helpers/api_helpers';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';

import './root.css';

class Root extends React.Component {
  state = {
    dogs: { first: { data: {}, next: {} } },
    cats: { first: { data: {}, next: {} } },
    dog_adopt: false,
    cat_adopt: false,
    personListUpdated: false,
    usersTurn: false,
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

  handleUpdateUsersTurn = () => {
    this.setState({ usersTurn: true });
  };

  handleStartDemo = () => {
    setTimeout(() => {
      this.handleCatAdopt();
      setTimeout(() => {
        this.handleAdoptSubmit();
      }, 1000);
    }, 5000);
    setTimeout(() => {
      this.handleDogAdopt();
      setTimeout(() => {
        this.handleAdoptSubmit();
      }, 1000);
    }, 10000);
    setTimeout(() => {
      this.handleCatAdopt();
      setTimeout(() => {
        this.handleAdoptSubmit();
      }, 1000);
    }, 15000);
    setTimeout(() => {
      ApiHelpers.addPerson('Moe Howard');
      this.setState({ personListUpdated: true });
    }, 20000);
    setTimeout(() => {
      ApiHelpers.addPerson('Shemp Howard');
      this.setState({ personListUpdated: true });
    }, 25000);
    setTimeout(() => {
      ApiHelpers.addPerson('Larry Fine');
      this.setState({ personListUpdated: true });
    }, 30000);
    setTimeout(() => {
      ApiHelpers.addPerson('Jerry Howard');
      this.setState({ personListUpdated: true });
    }, 35000);
  };

  async handleAdoptSubmit() {
    const usersTurn = this.state.usersTurn;
    if (this.state.cat_adopt === true) {
      await ApiHelpers.deleteCat();
      this.setState({ cat_adopt: false, usersTurn: false });
      this.getCats();
      if (usersTurn) {
        alert('Adoption Successful!');
      }
    }
    if (this.state.dog_adopt === true) {
      await ApiHelpers.deleteDog();
      this.setState({ dog_adopt: false, usersTurn: false });
      this.getDogs();
      if (usersTurn) {
        alert('Adoption Successful!');
      }
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
    console.log('UsersTurn', this.state.usersTurn);
    console.log('Cat', this.state.cat_adopt);
    console.log('Dog', this.state.dog_adopt);
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
        </main>
      </>
    );
  }
}

export default Root;
