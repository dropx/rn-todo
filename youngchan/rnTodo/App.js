/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TodoList   from './components/TodoList' ;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//유저는 TODO 항목을 입력하여 추가할 수 있다. 추가될 때 TODO 내용, 생성 날짜, 최초상태(DONE 여부)가 저장된다.

export default class App extends Component {

  //todoItem과 todoList를 state 내에서 관리한다.
  state = { todoList: [], todoItem: { id: undefined, contents: 'new', createAt: undefined, isDone: 'N' } };

  // todoItem에 대한 내용을 입력한다.
  inputTodo(contents) {
    this.setState({ todoItem: { id: this.state.todoItem.id, contents, createAt: this.state.todoItem.createAt, isDone: this.state.todoItem.isDone } })
  }

  //todoItem을 todoList에 추가한다. 
  addTodo() {
    const todoItem = {...this.state.todoItem}
    
    todoItem.id = Date.now();
    todoItem.createAt = new Date();
    this.setState({ todoList: this.state.todoList.concat( todoItem) });
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoList item=  {this.state.todoList}></TodoList>
        <TextInput
          style={{ height: 40 }}
          placeholder="todo에 입력을 해보세요!"
          onChangeText={(text) => this.inputTodo(text)}
        />
        <Button
          onPress={this.addTodo.bind(this)}
          title="입력"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
