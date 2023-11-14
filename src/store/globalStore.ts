import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  addTodo(title: string, author?: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStore = createStore<IGlobalStore>(
  (setState, getState) => ({
    user: null,

    todos: [],

    login: () => {
      setState({
        user: {
          email: 'matttalves@gmail.com',
          name: 'Matheus Pereira',
        },
      });
    },

    logout: () => setState({ user: null }),

    addTodo: (title: string) => {
      const loggedUser = getState().user;

      setState((prevState) => ({
        todos: prevState.todos.concat({
          id: Date.now(),
          title,
          author: loggedUser?.name ?? 'Convidado',
          done: false,
        }),
      }));
    },

    toggleTodoDone: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo,
        ),
      }));
    },

    removeTodo: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo.id !== todoId),
      }));
    },
  }),
);
