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
                    rate: interest
                }
            });
        }
    }

    const clearValues = () => {
        document.getElementById("form").reset();

        setRequiredMessage("");
        setAmount(0);
        setInterest(0);
        setYears(0);

        dispatch({
            type: actions.CLEAR_FORM,
            payload: {}
        });

    }



    return (
        <div className="calculator_wrapper">
            <div className="form_total_wrapper">
                <form id="form">
                    <span>
                        <label htmlFor="amount">Amount: </label>
                        <input onChange={(e) => setAmount(e.target.value)} required="required" pattern="[0-9]" type="text" placeholder="$"></input>
                    </span>
                    <span>
                        <label htmlFor="interest">Interest: </label>
                        <input onChange={(e) => setInterest(e.target.value)} required="required" pattern="[0-9]" type="text" placeholder="%"></input>
                    </span>
                    <span>
                        <label htmlFor="years">Years: </label>
                        <input onChange={(e) => setYears(e.target.value)} required="required" pattern="[0-9]" type="number" placeholder=""></input>
                    </span>
                    <p>{requiredMessage}</p>
                </form>
                <div>
                    <h4>TOTAL</h4>
                    <p>{total ? `$ ${total}` : `$0`}</p>
                </div>
                <div className="calculator_buttons">
                    <button className="submitValues" onClick={setValues} type="submit">Submit</button>
                    <button className="clearValues" onClick={clearValues} type="submit">Clear All</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;