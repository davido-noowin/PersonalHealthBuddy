import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { CheckListRow } from '../components/checklist_row';

export function LogFood({ navigation }) {
    return (
        <View style={[styles.root_container, {flexDirection:'column'}]}>
    
          <View style={styles.header}>
            <Text style={styles.header_text}>Personal Health Buddy</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
          </View>
    
          <View style={styles.body}>
    
            <View style={styles.center}>
                <ScrollView style={styles.scroll_view}>
                    <CheckListRow text="Did you eat a meal today?"/>
                    <CheckListRow text="Did you eat fruits today?"/>
                    <CheckListRow text="Did you eat fiber today?"/>
                </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_view:{
        height: '90%',
        width: '50%',
        margin: '10%',
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

