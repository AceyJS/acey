import React, { useState } from 'react';
import UserController from './ascey/controllers/user'
import { connect} from 'react-ascey'

function App(props: any) {
  const [isLoading, setLoading] = useState(false)

  const {
    device,
    user
  } = props

  const onClickFetch = async () => {
    setLoading(true)
    await UserController.fetchUser()
    setLoading(false)
  }

  return (
    <div>
      <button onClick={onClickFetch}>Fetch user</button>

      {isLoading && <span>loading...</span>}
      {!isLoading && 
      <div>
        <p>name: {user.getName()}</p>  
        <p>gender: {user.getGender()}</p>  
        <p>age: {user.getAge()}</p> 
        <p>___________</p>
        <p>device: {device}</p> 
      </div>
      }
    </div>
  );
}

const mapStateToProps = () => {
  return {
    user: UserController.getState().getUser(),
    device: UserController.getState().getDevice()
  }
}

export default connect(mapStateToProps)(App)
