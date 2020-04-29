import React from 'react'
import AppNavigator from './navigation'
import {
  createStore,
  applyMiddleware,
} from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import appReducer from './redux'
import AsyncStorage from '@react-native-community/async-storage'

const store = createStore(
    appReducer,
    applyMiddleware(ReduxThunk, logger)
);

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      user: {},
      isloading: false
    }
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount= async () => {
    try{
      const loginUser = await AsyncStorage.getItem('@user')
      const loginUser1 = JSON.parse(loginUser)
      if(loginUser1){
        this.setState({ user: loginUser1 })
      }
      this.setState({ isloading: true })
    } catch(e){
      console.log('eror',e)
      this.setState({ isloading: true })
    }
  }

  updateUser(user){
    this.setState({ user })
  }

  render() {
    const { user, isloading } = this.state
    return (
      isloading &&
        <Provider store={store}>
          <AppNavigator
            user={user}
            updateUser={this.updateUser}
          />
        </Provider>
    )
  }
}