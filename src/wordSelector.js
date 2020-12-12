import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, Button,FlatList } from "react-native";
import PropTypes from 'prop-types';

export default class WordSelector extends Component {
  state = {
    wordList: null
  }

  componentDidMount() {
    let wordList = [];
    if (this.props.wordBlock &&
      this.props.wordBlock.textBlocks &&
      this.props.wordBlock.textBlocks.length > 0) {
      for (let idx = 0; idx < this.props.wordBlock.textBlocks.length; idx++) {
        let text = this.props.wordBlock.textBlocks[idx].value;
        if (text && text.trim().length > 0) {
          let words = text.split(/[\s,.?]+/);
          if (words && words.length > 0) {
            for (let idx2 = 0; idx2 < words.length; idx2++) {
              if (words[idx2].length > 0)
                wordList.push(words[idx2]);
            }
          }
        }
      }

      this.setState({ wordList: wordList });
    }
  }

  populateWords() {
    const wordViews = [];
    if (this.state.wordList && this.state.wordList.length > 0) {
      this.state.wordList.map((item) => {
        wordViews.push(<Text style={styles.word}>{item}</Text>);
      })
    }
    return wordViews;
  }

  getOurValue = () => {
    let data = []
    this.props.ourValue.map((item) => {
      const left = item.Xaxis
      const top = item.Yaxis
      data.push(<Text style={{  marginLeft: left, marginTop: top ,borderWidth: 2,padding: 3 }}>{item.value}</Text>)
    })

    return data
  }

  tableViewData = () => {
    return (
      <FlatList
        data={this.props.ourValue}
        keyExtractor = {(item,index) => index.toString()}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <Text style = {{width: '50%',borderWidth: 2,padding: 3}}>{item.value}</Text>
          )
        }}
      />
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView>
          <View style={styles.wordList}>
            {/* { this.populateWords() } */}
            {this.getOurValue()}
          </View>
        </ScrollView>
        {/* {this.tableViewData()} */}
        <Button title='OK' onPress={this.props.closeScreen} />
        <View style={{ minHeight: 30 }}></View>
      </View>
    );
  }
}

WordSelector.propTypes = {
  wordBlock: PropTypes.object,
  onWordSelected: PropTypes.func
};

WordSelector.defaultProps = {
  wordBlock: null,
  onWordSelected: null
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  wordList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 8
  }
});