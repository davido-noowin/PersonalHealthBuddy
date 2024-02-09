import {StyleSheet, Text, View, Button} from 'react-native';

export function CheckListRow(props){
    return (
        <View style={styles.row}>
            <Text>{props.text}</Text>
            <Button title="[]"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        backgroundColor:"#9BBEC8",
        padding:10,
    }
});