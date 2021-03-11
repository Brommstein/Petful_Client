import ApiHelpers from '../helpers/api_helpers';
import person from './people';

export default function randomPerson() {
    let i = Math.floor(Math.random() * 24);
    ApiHelpers.addPerson(person[i]);
};