import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

const image={uri:"assets/mainscore_octogon.png"};

export default function App() {
  return (

    <View style={[styles.root_container, {flexDirection:'column'}]}>

      <View style={styles.header}>
        <Text style={styles.header_text}>Personal Health Buddy</Text>
      </View>

      <View style={styles.body}>

        <View style={styles.center}>
          <ImageBackground style={styles.octogon} source={require("./assets/mainscore_octogon.png")}>
            <Text style={[styles.body_text, {fontSize:28}]}>Your Score</Text>
            <Text style={[styles.body_text, {fontSize:42}]}>83</Text>
          </ImageBackground>
        </View>
        
        {/* add other octogons later */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  root_container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header:{
    flex: 1,
    backgroundColor: '#9BBEC8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3%'
  },

  header_text:{
    color:'white',
    fontSize:30
  },

  center:{

  },

  octogon:{
    height:200,
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  body:{
    flex: 9,
    backgroundColor: '#164863',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body_text:{
    color:'white',
  }

});
