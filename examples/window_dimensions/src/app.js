import React, { useEffect } from 'react';
import UIController from './ascey/controllers/ui'
import { connect } from 'react-ascey';

const App = (props) => {

    const { 
        uiWindow
    } = props

    const onResizeWindow = () => {
        window.onresize = (e) => {
            UIController.updateWindowDimensions({width: window.innerWidth, height: window.innerHeight})
        };
    }
    useEffect(() => onResizeWindow(), [])

    return (
        <div>
            <span style={{color: 'green'}}>{uiWindow.getDimensionKey()}</span>
            <br />
            <span>{uiWindow.width}, {uiWindow.height}</span>
        </div>
    )
}

export default connect(state => {
    return {
        uiWindow: UIController.extend(state).window
    }
})(App)