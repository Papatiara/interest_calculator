import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './calculator.css'


import * as actions from '../redux/actionTypes';



const Calculator = () => {

    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [years, setYears] = useState(0);
    const [requiredMessage, setRequiredMessage] = useState("");

    const total = useSelector((state) => state);
    const dispatch = useDispatch();


    const setValues = (e) => {
        e.preventDefault();
        if (!amount || !interest || !years) {
            setRequiredMessage("You missed a required field");
        } else {
            setRequiredMessage("");

            dispatch({
                type: actions.TOTAL_ASKED,
                payload: {
                    amount: amount,
                    years: years,
                    interest: interest
                }
            });
      
        }
    }

    const clearValues = () => {

        setRequiredMessage("");
        dispatch({
            type: actions.CLEAR_FORM,
            payload: {
                amount: 0,
                years: 0,
                interest: 0
            }
        });
        document.getElementById("form").reset();
        setAmount(0);
        setYears(0);
        setInterest(0);

    }



    return (
        <div className="calculator_wrapper">
            <div className="form_total_wrapper">
                <form id="form" autocomplete="on">
                    <span>
                        <label htmlFor="amount">Amount: </label>
                        <input onInput={(e) => setAmount(e.target.value)}
                            required="required" pattern="[0-9]" type="number" placeholder="$"
                        ></input>
                    </span>
                    <span>
                        <label htmlFor="interest">Interest: </label>
                        <input onInput={(e) => setInterest(e.target.value)}
                            required="required" pattern="[0-9]" type="number" placeholder="%">
                        </input>
                    </span>
                    <span>
                        <label htmlFor="years">Years: </label>
                        <input onInput={(e) => setYears(e.currentTarget.value)}
                            required="required" pattern="[0-9]" type="number" placeholder="">
                        </input>
                    </span>
                    <p>{requiredMessage}</p>
                    <div className="calculator_buttons">
                        <button className="submitValues" onClick={setValues} type="submit">Submit</button>
                        <button className="clearValues" onClick={clearValues} type="submit">Clear All</button>
                    </div>
                </form>
                <div>
                    <h4>TOTAL</h4>
                    <p>{total ? `$ ${total}` : `$0`}</p>
                </div>

            </div>
        </div>
    );
}

export default Calculator;