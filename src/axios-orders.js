import axios from 'axios';

export default axios.create({
  baseURL: `https://burger-builder-react-61ca1.firebaseio.com/`
});