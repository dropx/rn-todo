import React, {
  Component
} from 'react'
import {
  Button
} from 'react-native';
import styled from 'styled-components/native'


const TodoItem = styled.View`
    width: 100%;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-around;
    marginVertical: 5;
`

const TodoItemToggle = styled.View` 
    flex: 1;
`
const TodoItemDeleteButton = styled.View`
    flex: 1;
`
const TodoItemContents = styled.View`
  flex: 4;
`
const TodoItemContentsText = styled.Text`
  font-size: 15;
`;

class TodoListItem extends Component {
  render() {
    const { item, toggleDone, deleteTodoItem } = this.props;
    return (
      <TodoItem key={item.id}>
        <TodoItemToggle>
          <Button
            onPress={() => toggleDone(item.id)}
            title={item.isDone == true ? '☑️' : '⬜'} // check: ☑, uncheck: ⬜
            color="#841584"
          />
        </TodoItemToggle>
        <TodoItemContents>
          <TodoItemContentsText
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.contents}
          </TodoItemContentsText>
        </TodoItemContents>
        <TodoItemDeleteButton>
          <Button
            onPress={() => deleteTodoItem(item.id)}
            title="[-]" // check: ☑, uncheck: ⬜
            color="#841584"
          />
        </TodoItemDeleteButton>
      </TodoItem>
    )
  }
};

export default TodoListItem;