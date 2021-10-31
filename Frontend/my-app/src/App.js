import './App.css';
import Header from './component/home';

import { Provider } from 'react-redux';
import store from './redux/stroe';
import ShowAlldiamonds from './component/showAlldiamonds';
// import {createStore} from 'redux'
// import {connect} from 'react-redux'

function App() {
  return (

    <Provider store={store}>
      <Header></Header>
      <ShowAlldiamonds />
      <Header></Header>


    </Provider>
  );
}

// const mapStateToProps =state=>{
//   return{
//     siteName:state.siteName
//   }
//   const mapDispatchToProps =dispatch=>{
//     return{
//       changSiteName(){
//         dispatch({
//         type:"CHANGE_SITE_NAME",
//         payload:newSiteName
//         })
//       }
//     }
// }

export default App;
