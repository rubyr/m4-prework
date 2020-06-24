export const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), todo: action.todo, completed: false },
      ];
    case "MARK_COMPLETE":
      return [
        ...state.map((t) =>
          t.id === action.id
            ? { id: t.id, todo: t.todo, completed: !t.completed }
            : t
        ),
      ];
    default:
      return state;
  }
};
