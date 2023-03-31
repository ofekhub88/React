import React from 'react';
import { createStore } from "redux";
import { render, screen } from '@testing-library/react';
import {Provider} from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import App from "../components/App";
import { handleSetAuther } from "../actions/autherUser";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'; 

describe("App", () => {
    
    it("   component render snampshot", () => {
        const store = createStore(reducer, middleware);
       // store.dispatch(handleSetAuther("tylermcginnis"));    
        const component = render(
            <Provider store={store}>
              <App />
            </Provider>
          );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Navigate  logging when  no logged user detected", () => {
      const store = createStore(reducer, middleware);
      
      const component = render(
       
          <Provider store={store}>
            <App />
          </Provider>
         
        );
       var logcard = component.getByTestId('login-card')
       expect(logcard).toBeInTheDocument();
    });

    it("Show Home page after logged in ", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleSetAuther("zoshikanlu"));  
       
        const component = render(
             <MemoryRouter>
            <Provider store={store}>
              <App />
            </Provider>
            </MemoryRouter>
          );

        var home_page = component.getByTestId("home-card");
        expect(home_page).toBeInTheDocument();
    });
});