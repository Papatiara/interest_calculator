import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';                         
import App from './App';
import Calculator from './components/Calculator';


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



describe('action CLEAR_FORM test', () => {
  it('Should handle clear form action returning 0', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    )

    const testingValue = ({
      type: actionsTypes.CLEAR_FORM,
      payload: {
        amount: "0",
        years: "0",
        interest: "0"
      }
    });

    await store.dispatch(testingValue);

    wrapper.update();


    expect(store.getState()).toEqual(0);
  })
})


describe('action TOTAL_ASKED - general test for int value', () => {
  it('It should return the expected value', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    )

    const testingValue = ({
      type: actionsTypes.TOTAL_ASKED,
      payload: {
        amount: "5000",
        years: "5",
        interest: "0.025"
      }
    });


    await store.dispatch(testingValue);

    wrapper.update();


    expect(store.getState()).toEqual("5625.00");
  })
})


describe('action TOTAL_ASKED - general test for float value', () => {
  it('It should return the expected value, rounding it with 2 digits after fixed point', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    )

    const testingValue = ({
      type: actionsTypes.TOTAL_ASKED,
      payload: {
        amount: "569.03",
        years: "5",
        interest: "0.025"
      }
    });


    await store.dispatch(testingValue);

    wrapper.update();


    expect(store.getState()).toEqual("640.16");
  })
})

describe('Memory leaking test action TOTAL_ASKED followed by CLEAN_FORM action ', () => {
  it('It should return the right results without memory leaking', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Calculator />
      </Provider>,
    )

    const testingValue1 = ({
      type: actionsTypes.TOTAL_ASKED,
      payload: {
        amount: "5000",
        years: "5",
        interest: "0.025"
      }
    });

    const testingValue2 = ({
      type: actionsTypes.CLEAR_FORM,
      payload: {
        amount: 0,
        years: 0,
        interest: 0
      }
    });

     const testingValue3 = ({
      type: actionsTypes.TOTAL_ASKED,
      payload: {
        amount: "5000",
        years: "5",
        interest: "0.025"
      }
    });


    await store.dispatch(testingValue1) && store.dispatch(testingValue2) && store.dispatch(testingValue3);


    wrapper.update();


    expect(store.getState()).toEqual("5625.00");
  });
});
