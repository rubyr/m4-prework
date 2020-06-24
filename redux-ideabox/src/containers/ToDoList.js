import React from "react";
import { connect } from "react-redux";
import Todo from "./ToDo";

const ToDoList = ({ todos }) => {
  const items = todos.map((todo) => <Todo key={todo.id} {...todo} />);
  return <ul>{items}</ul>;
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(ToDoList);
