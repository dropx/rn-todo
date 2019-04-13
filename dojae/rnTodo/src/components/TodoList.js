import React, {
  Component
} from 'react'
import {
  Button
  , FlatList
} from 'react-native';
import styled from 'styled-components/native'


const TodoListView = styled.View`
  margin: 10px;
  width: 100%;
  flex-direction: row;
  display: flex;
  flex: 9;
`

// 1. statefull component 작성
// 1-2 스타일을 추출
// 2. props로 todoList를 받는다.

class TodoList extends Component {

  render() {
    return (
    <TodoListView >
      <FlatList data={
        this.props.todoList.sort((a, b) => {
          if (a.createAt < b.createAt) return 1;
          if (a.createAt > b.createAt) return -1;
          if (a.createAt === b.createAt) return 0;
        })
      }
        renderItem={({ item }) => this.props.renderTodoItem(item)}
        keyExtractor={
          item => String(item.id)
        }
      />
      </TodoListView>
    );
  }
}

export default TodoList;