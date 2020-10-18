import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


import { Provider } from 'react-redux';
import store from './redux/store';
import * as actionsTypes from './redux/actionTypes';
import * as actions from './redux/actions';




test('renders Interest Calculator title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = getByText(/Calculator/i);
  expect(linkElement).toBeInTheDocument();
});


test('handling missing data from required fields', () => {

  const testingValue = ({
    type: actionsTypes.TOTAL_ASKED,
    payload: {
      amount: 0,
      years: 5,
      interest: 0.025
    }
  });

  const expectedValue = ({
    type: actionsTypes.TOTAL_ASKED,
    payload: {
      amount: 0,
      years: 0,
      interest: 0
    }
  });
  expect(actions.submitData(testingValue)).toEqual(expectedValue)
});



