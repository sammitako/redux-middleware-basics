import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import {
  decrease,
  decreaseAsync,
  increase,
  increaseAsync,
} from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter); // modules/index.js
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };

  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
