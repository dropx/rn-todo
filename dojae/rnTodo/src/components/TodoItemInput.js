import React, { Component } from 'react'
import { Button } from 'react-native';
import styled from 'styled-components/native'

const TodoItemInputView = styled.View`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
`

const TodoItemTextInput = styled.TextInput`
  flex: 4;
  font-size: 18;
  padding: 10px;
  border-color: #999;
  border-width: 1;
  background-color: white;
  margin-right: 10;
`

const TodoItemAddButtonView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: #999;
  border-width: 1;
`
// 1. statefull component 작성
// 2. 자체 상태변경 (todoInputText)
// 3. add 할때 상위 상태를 업데이트 (prop.addTodoItem)
class TodoItemInput extends Component {
  state = {
    todoInputText: ""
  }

  updateTodoInputText = (todoInputText) => {
    this.setState({ todoInputText });
  }

  render() {
    const addTodoItem = this.props.addTodoItem;
    return (
      <TodoItemInputView>
        <TodoItemTextInput
          placeholder="todo에 입력을 해보세요!"
          onChangeText={text => this.updateTodoInputText(text)}
          value={this.state.todoInputText}
        />
        <TodoItemAddButtonView>
          <Button
            onPress={() => {
              addTodoItem(this.state.todoInputText);
              this.updateTodoInputText("");
            }}
            title="+"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            disabled={!this.state.todoInputText}
          />
        </TodoItemAddButtonView>
      </TodoItemInputView>

    );
  }
}

export default TodoItemInput;

