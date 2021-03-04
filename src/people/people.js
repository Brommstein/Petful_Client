import React from 'react';
import ApiHelpers from '../helpers/api_helpers';
import './people.css';

class People extends React.Component {
  state = {
    people: [],
    addingName: false,
    addedName: false,
    firstName: '',
    userName: null,
  };

  handleAddName = () => {
    this.setState({ addingName: !this.state.addingName });
  };

  async handleSubmitName(e) {
    e.preventDefault();
    const { person } = e.target;
    let res = await ApiHelpers.addPerson(person.value);
    this.setState({
      people: [...this.state.people, res.data],
      userName: person.value,
      addingName: false,
      addedName: true,
    });
    this.props.handleStartDemo();
  }

  componentDidUpdate() {
    if (this.props.personListUpdated === true) {
      this.getPeople();
      this.props.handleUpdatePeopleList();
    }
    if (this.state.firstName === this.state.userName) {
      this.setState({ userName: null });
      this.props.handleUpdateUsersTurn();
    }
  }

  async getPeople() {
    let res = await ApiHelpers.getPeople();
    let peopleList = this.populatePeopleList(res);
    this.setState({
      people: peopleList,
      firstName: peopleList[0],
    });
  }

  async componentDidMount() {
    this.getPeople();
  }

  populatePeopleList = function (res) {
    const peopleChain = res;
    let arr = [];
    while (peopleChain.first) {
      arr.push(peopleChain.first.data);
      peopleChain.first = peopleChain.first.next || null;
    }
    return arr;
  };

  render() {
    const people = this.state.people.map((person, idx) => {
      return (
        <span key={idx}>
          {person} <br />
        </span>
      );
    });

    return (
      <div className="people-container">
        Adopters List:
        <br />
        <br />
        {people}
        {this.state.addingName && (
          <>
            <form onSubmit={(e) => this.handleSubmitName(e)} action="#">
              <label htmlFor="person">Input Name:</label>
              <input id="person"></input>
              <button className=" myButton" type="submit">
                Submit
              </button>
            </form>
          </>
        )}
        {!this.state.addedName && (
          <>
            <button
              className="addbutton myButton"
              type="button"
              onClick={() => this.handleAddName()}
            >
              Add Name to List
            </button>
            <br />
          </>
        )}
      </div>
    );
  }
}

export default People;
