import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, SectionList  } from 'react-native';


 class TodoList extends Component {

  render() {
    const {item } = this.props ;

    const itemList = item.map( ({contents}) => (
        <Text style={ {height:40} }> {contents} </Text>
    ));

    return (
      <View>
        <Text> 오늘할일  </Text>
        {itemList}
        <View></View>
      </View>
    );
  }
}

export default TodoList ;



