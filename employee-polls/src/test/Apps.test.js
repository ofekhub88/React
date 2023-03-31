import React from 'react';
import { createStore } from "redux";
import { render, screen } from '@testing-library/react';
import {Provider} from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import App from "../components/App";
import { BrowserRouter } from 'react-router-dom';
import { handleSetAuther } from "../actions/autherUser";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router';

describe("App", () => {
    
    it("   component render snampshot", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleSetAuther("tylermcginnis"));    
        const component = render(
          <MemoryRouter>
            <Provider store={store}>
              <BrowserRouter>
              <App />
              </BrowserRouter>
            </Provider>
            </MemoryRouter>,
          );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("How logging wehn no logged user detected", () => {
      const store = createStore(reducer, middleware);
      
      const component = render(
        <MemoryRouter>
          <Provider store={store}>
            <BrowserRouter>
            <App />
            </BrowserRouter>
          </Provider>
          </MemoryRouter>,
        );
       var logcard = component.getByTestId('login-card')
       expect(logcard).toBeInTheDocument();
    });

    it("Show Home page after logged in ", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleSetAuther("tylermcginnis"));    
        const component = render(
          <MemoryRouter>
            <Provider store={store}>
              <BrowserRouter>
              <App />
              </BrowserRouter>
            </Provider>
            </MemoryRouter>,
          );

        var home_page = component.getByTestId("home-card");
        expect(home_page).toBeInTheDocument();
    });
});