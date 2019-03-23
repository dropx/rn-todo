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
import { Platform, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// 유저가 입력된 TODO항목은 리스트로 출력된다.
// Flat list에 contents, createAt, isDone을 출력한다.


export default class App extends Component {

  //todoItem과 todoList를 state 내에서 관리한다.
  state = { todoList: [], todoItem: { id: undefined, contents: 'new', createAt: undefined, isDone: false } };

  // todoItem에 대한 내용을 입력한다.
  inputTodo(contents) {
    this.setState({ todoItem: { id: this.state.todoItem.id, contents, createAt: this.state.todoItem.createAt, isDone: this.state.todoItem.isDone } })
  }

  //todoItem을 todoList에 추가한다. 
  addTodo() {
    const todoItem = { ...this.state.todoItem }

    todoItem.id = Date.now();
    todoItem.key = todoItem.id;
    todoItem.createAt = new Date();
    this.setState({ todoList: this.state.todoList.concat(todoItem) });
  }

  //  isDone에따라 check/uncheck로 변경된다.
  nextArrayState (prevArray, item, itemIndex) {
    return [...prevArray.slice(0, itemIndex), item, ...prevArray.slice(itemIndex + 1)]
  }
  toggleDone(id) {
    const itemIndex = this.state.todoList.findIndex((item) => item.id == id)
    if (itemIndex === -1) return;
    const todoList = this.state.todoList;
    item = todoList[itemIndex]
    item.isDone = !item.isDone;
    this.setState({ todoList: this.nextArrayState(todoList, item, itemIndex)});
  }


  renderTodoItem = ({ item }) =>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <Text>{item.contents}</Text>
      <Button
        onPress={() => this.toggleDone(item.id)}
        title={item.isDone == true ? "☑️" : "⬜"} // check: ☑, uncheck: ⬜
        color="#841584"
      />
    </View>


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{JSON.stringify(this.state)}</Text>
        <FlatList
          data={this.state.todoList}
          renderItem={this.renderTodoItem}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="todo에 입력을 해보세요!"
          onChangeText={(text) => this.inputTodo(text)}
        />
        <Button
          onPress={this.addTodo.bind(this)}
          title="입력3"
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
