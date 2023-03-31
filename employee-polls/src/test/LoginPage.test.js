import React from 'react';
import { createStore } from "redux";
import { fireEvent,render, screen } from '@testing-library/react';
import {Provider} from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'; 
import { handleInitialData } from "../actions/shared"
import LoginPage from '../components/LoginPage';
import App from '../components/App';

describe("LoginPage", () => {
    it("   component render snampshot", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleInitialData());
        const component = render(
          <MemoryRouter>
            <Provider store={store}>
              <LoginPage />
            </Provider>
            </MemoryRouter>
          );
        
          expect(component).toBeDefined();
          expect(component).toMatchSnapshot();
    });

    it("When go to Login Page Should sholde be disabled ", async () => {
      const store = createStore(reducer, middleware);
      
      const response = await  store.dispatch(handleInitialData()).catch(e => e);
      const { users } = store.getState();
      const component = render(
        <Provider store={store}>
          <LoginPage users={users}/>
        </Provider>
      );
      
       expect(component.getByTestId("Submit")).toBeDisabled();
  });
  
  it("When choose user radio need to checked + Submit enabled", async () => {
    const store = createStore(reducer, middleware);
    
    const response = await  store.dispatch(handleInitialData()).catch(e => e);
    const { users } = store.getState();
    const component = render(
      <Provider store={store}>
        <LoginPage users={users}/>
      </Provider>
    );
    var submitButton = component.getByTestId("tylermcginnis");
        
    fireEvent.click(submitButton)

     expect(component.getByTestId("checkedtylermcginnis")).toBeChecked();
     expect(component.getByTestId("Submit")).toBeEnabled();
   
});
});