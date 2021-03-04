# Welcome to Petful!

## Live Link: https://petful-client-template-theta.vercel.app/

Server Repo: https://github.com/nlomba1Thinkful/Petful-Server

Front-End: `ReactJS, JSX`

Sever-Side: `NodeJS, ExpressJS`

The only thing we love more than Pets is queues! And we have a lot of them. This app will demonstarte some functionality of the Queue Stack Data Structure (Dogs, Cats, and People) and how it may apply to helping those seeking to adopt a pet.

All Data is stored and retrieved on server memory in a Linked List.

## How it works:

- Users first in line are only the ones able to adopt.
- Pets first in line are only the ones able to be adopted, either Cat, Dog, or Both.
- Add your name to the list and wait your turn until you are able to adopt a pet!

# Api

| Path       | Method |                           |
| ---------- | ------ | ------------------------- |
| /pets/     | GET    | returns all pets          |
| /pets/cats | GET    | returns all cats          |
| /pets/dogs | GET    | returns all dogs          |
| /pets/cats | DELETE | deletes first-in cat      |
| /pets/dogs | DELETE | deletes first-in dog      |
| /people/   | GET    | returns all people        |
| /people/   | POST   | adds a new person to list |
| /people/   | DELETE | deletes first-in person   |
