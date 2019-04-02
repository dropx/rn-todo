/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 *
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  //todoItem과 todoList를 state 내에서 관리한다.
  state = {
    todoList: [],
    todoItemInput: ""
  };

  textInputRef;

  // 입력할 todo item 내용을 업데이트한다.
  updateTodoItemInput(todoItemInput) {
    this.setState({
      ...this.state,
      todoItemInput
    });
  }

  //todoItem을 todoList에 추가한다.
  addTodoItem() {
    const todoItem = {
      id: Date.now(),
      createAt: new Date(),
      updateAt: new Date(),
      contents: this.state.todoItemInput
    };

    this.setState({
      todoItemInput: "",
      todoList: this.state.todoList.concat(todoItem)
    });
  }

  toggleDone(id) {
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
        ...todoList.slice(itemIndex + 1)
      ]
    });
  }

  deleteTodoItem(id) {
    const itemIndex = this.state.todoList.findIndex(item => item.id == id);
    if (itemIndex === -1) return;
    const todoList = this.state.todoList;
    const nextStateTodoList = [
      ...todoList.slice(0, itemIndex),
      ...todoList.slice(itemIndex + 1)
    ];
    this.setState({
      ...this.state,
      todoList: nextStateTodoList
    });
  }

  renderTodoItem = (item) => (
    <View
      key={item.id}
      style={styles.todoItem}
    >
      <View style={styles.todoItemToggleButton}>
        <Button
          onPress={() => this.toggleDone(item.id)}
          title={item.isDone == true ? "☑️" : "⬜"} // check: ☑, uncheck: ⬜
          color="#841584"
        />
      </View>
      <View style={styles.todoItemContents}>
        <Text 
        style={styles.todoItemContentsText}
        ellipsizeMode="tail" 
        numberOfLines={1}>{item.contents}</Text>
      </View>
      <View style={styles.todoItemDeleteButton}>
        <Button
          onPress={() => this.deleteTodoItem(item.id)}
          title="[-]" // check: ☑, uncheck: ⬜
          color="#841584"
        />
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* input view */}
        <View style={styles.todoItemInputView}>
          <TextInput
            style={styles.todoItemTextInput}
            ref={instance => {
              this.textInputRef = instance;
            }}
            placeholder="todo에 입력을 해보세요!"
            onChangeText={text => this.updateTodoItemInput(text)}
            value={this.state.todoItemInput}
          />
          <View style={styles.todoItemAddButton}>
            <Button
              onPress={this.addTodoItem.bind(this)}
              title="+"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              disabled={!this.state.todoItemInput}
            />
          </View>
        </View>
        {/* todoList FlatList 컴포넌트로 만들기 */}
        <View style={styles.todoList}>
          {/*this.state.todoList.map(this.renderTodoItem)*/}
          <FlatList
            data={this.state.todoList.sort((a, b) => {
              if(a.createAt < b.createAt) return 1;
              if(a.createAt > b.createAt) return -1;
              if(a.createAt === b.createAt) return 0;
            })}
            renderItem={({item}) => this.renderTodoItem(item)}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingVertical: 50,
    paddingHorizontal: 10
  },

  todoItemInputView: {
    flex: 1,
    display: "flex",
    width: "100%",
    flexDirection: "row"
  },
  todoItemTextInput: {
    flex: 4,
    fontSize: 18,
    padding: 10,
    borderColor: "#999",
    borderWidth: 1,
    backgroundColor: "white",
    marginRight: 10
  },
  todoItemAddButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999",
    borderWidth: 1
  },
  todoList: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flex: 9
  },
  todoItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-around",
    marginVertical: 5
  },
  todoItemToggleButton: {
    flex: 1
  },
  todoItemContents: {
    flex: 4
  },
  todoItemContentsText: {
    fontSize: 15
  },
  todoItemDeleteButton: {
    flex: 1
  }
});
