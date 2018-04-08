import Reflux from 'reflux';
import actions from '../actions/actions';
import axios from 'axios';

class StatsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      open: false,
      weeks: [],
      current:[]
    };
    this.listenables = actions;
  }
  handleOpen(){
   this.setState({open: true});
 };

 handleClose(){
   this.setState({open: false});
 };
  getStats() {
    axios.get('http://localhost:3001/statistics/')
    .then((res) => {
      if(res.data.error) throw res.data.error;
         this.setState({
          weeks:res.data.weeks,
          current:res.data.last
         })
    })
    .catch(function (error) {
    window.alert(error);
  });
  }
}
export default StatsStore;
