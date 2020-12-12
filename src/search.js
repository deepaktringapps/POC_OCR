import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

import Camera, { Constants } from "./camera";
import WordSelector from "./wordSelector";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: true,
      showWordList: false,
      recogonizedText: null,
      ourValue: []
    };
  }

    onOCRCapture(data,recogonizedText) {
        let ourValue = []
        const res = recogonizedText.textBlocks
        res.map((item, index) => {
            const value = item.value
            const height = item.bounds.size.height
            const width = item.bounds.size.width
            const Xaxis = item.bounds.origin.x
            const Yaxis = item.bounds.origin.y
            const obj = Object.assign({ value: value,height: height, width: width,Xaxis: Xaxis,Yaxis: Yaxis })
            ourValue.push(obj)

            // console.log('components-------->', JSON.stringify(item.components))

        })
        console.log(JSON.stringify(ourValue))
        this.setState({ showCamera: false, showWordList: true, recogonizedText: recogonizedText,ourValue: ourValue });
    }

  render() {
    return (
      <>
        <SafeAreaView
          style={{padding: 6}}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" >
              <TouchableOpacity style={styles.searchCamera} onPress={() => {
                this.setState({ showCamera: true });
              }}>
                <Icon name="ios-camera" size={300} color="#22222288" />
              </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        {
          this.state.showCamera &&
          <Camera
            cameraType={Constants.Type.back}
            flashMode={Constants.FlashMode.off}
            autoFocus={Constants.AutoFocus.on}
            whiteBalance={Constants.WhiteBalance.auto}
            ratio={'4:3'}
            quality={0.5}
            imageWidth={800}
            enabledOCR={true}
            onCapture={(data, recogonizedText) => this.onOCRCapture(data,recogonizedText)}
            onClose={_ => {
              this.setState({ showCamera: false });
            }}
          />
        }
        {
          this.state.showWordList &&
          <WordSelector wordBlock={this.state.recogonizedText} closeScreen={this.onClosePress} ourValue = {this.state.ourValue}/>
        }
      </>
    );
  }

  onClosePress = () => {
    console.log('Close value', this.state.showWordList)
    this.setState({ showWordList: false })
  }
}

export default () => {
  return (
    <Search  />
  )
}

const styles = StyleSheet.create({
  searchCamera: {
    marginTop: '60%',
    marginLeft: 5,
    padding: 0,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});