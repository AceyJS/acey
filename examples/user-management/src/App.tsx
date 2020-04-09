import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-ascey'
import UserController from './ascey/controllers/user'

function App(props: any) {
  const { 
    user
  } = props

  const [loading, setLoading] = useState(false)

  const onClick = async() => {
    setLoading(true)
    const result = await UserController.fetchUserData()
    console.log(result)
    alert(result)
    setLoading(false)
  }

  return (
    <div className="App">
      {loading && <p>Loading...</p>}

      <span>name: {user.getName()} - </span>
      <span>age: {user.getAge()} - </span>
      <span>date: {user.getCreatedAt().toString()} - </span>
      <span>phone name: {user.getDevice().getPhoneName()}</span>
      <div>
        <button onClick={onClick}>Fetch !</button>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {
    user: UserController.getState()
  }
}

export default connect(mapStateToProps)(App);
