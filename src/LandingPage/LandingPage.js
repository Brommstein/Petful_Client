import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landingPage">
      <h2>Welcome to Petful!</h2>
      <br />
      <p>
        The only thing we love more than Pets is queues! And we have a lot of
        them. This app will demonstarte some functionality of the Queue Stack
        Data Structure (Dogs, Cats, and People) and how it may apply to helping
        those seeking to adopt a pet.
      </p>
      <br />
      <hr />
      <p> How it works: </p>
      <br />
      <ul>
        <li>Users first in line are only the ones able to adopt.</li>
        <li>
          Pets first in line are only the ones able to be adopted, either Cat,
          Dog, or Both.
        </li>
        <li>
          Add your name to the list and wait your turn until you are able to
          adopt a pet!
        </li>
      </ul>

      <Link to={'/adopt'}>
        <div className="button-wrapper">
          <div className="myButton">I'm ready!</div>
        </div>
      </Link>
    </div>
  );
}
