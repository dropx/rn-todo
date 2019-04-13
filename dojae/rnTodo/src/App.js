/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 *
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import TodoItemInput from './components/TodoItemInput';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


/**
 * 컴포넌트 분리
 * - [x] input
 * - list
 * - list item
 */
export default class App extends Component {
  //todoItem과 todoList를 state 내에서 관리한다.
  state = {
    todoList: [],
  };

  //todoItem을 todoList에 추가한다.
  addTodoItem = (inputText) => {
    const todoItem = {
      id: Date.now(),
      createAt: new Date(),
      updateAt: new Date(),
      contents: inputText,
    };

    this.setState({
      todoList: this.state.todoList.concat(todoItem),
    });
  }

  toggleDone = (id) => {
    const itemIndex = this.state.todoList.findIndex(item => item.id == id);
    if (itemIndex === -1) return;
    const todoList = this.state.todoList;
    const item = todoList[itemIndex];
    item.isDone = !item.isDone;
    item.updateAt = new Date();
    this.setState({
      ...this.state,
      todoList: [
        ...todoList.slice(0, itemIndex),
        item,
        ...todoList.slice(itemIndex + 1),
      ],
    });
  }

  deleteTodoItem = (id) => {
    const itemIndex = this.state.todoList.findIndex(item => item.id == id);
    if (itemIndex === -1) return;
    const todoList = this.state.todoList;
    const nextStateTodoList = [
      ...todoList.slice(0, itemIndex),
      ...todoList.slice(itemIndex + 1),
    ];
    this.setState({
      ...this.state,
      todoList: nextStateTodoList,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoItemInput addTodoItem={this.addTodoItem} />
        <TodoList
          todoList={this.state.todoList}
          renderTodoItem={item =>
            <TodoListItem
              item={item}
              toggleDone={this.toggleDone}
              deleteTodoItem={this.deleteTodoItem} />
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },

  todoItemInputView: {
    flex: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  todoItemTextInput: {
    flex: 4,
    fontSize: 18,
    padding: 10,
    borderColor: '#999',
    borderWidth: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  todoItemAddButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
  },
  todoItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  todoItemToggleButton: {
    flex: 1,
  },
  todoItemContents: {
    flex: 4,
  },
  todoItemContentsText: {
    fontSize: 15,
  },
  todoItemDeleteButton: {
    flex: 1,
  },
});
