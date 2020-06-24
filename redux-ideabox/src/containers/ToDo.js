import React from "react";
import { markComplete } from "../actions";
import { connect } from "react-redux";

const ToDo = ({ id, todo, completed, markComplete }) => {
  const lClass = (completed ? "" : "not-") + "completed";
  const btnText = completed ? "●" : "○";
  return (
    <li className={lClass}>
      <button onClick={() => markComplete(id)}>{btnText}</button>
      {todo}
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  markComplete: (id) => dispatch(markComplete(id)),
});

export default connect(null, mapDispatchToProps)(ToDo);
