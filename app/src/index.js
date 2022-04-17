import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import store from './middleware'


const drizzle = new Drizzle(drizzleOptions, store);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <App drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>, 
    document.getElementById('root')
);

