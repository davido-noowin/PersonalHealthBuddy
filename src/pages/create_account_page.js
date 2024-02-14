import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function CreateAccountPage({navigation}){
    
    return (
    <View style={[PHB_STYLES.root_container, styles.root]}>
        <Text style={styles.title_text}>Personal Health Buddy</Text>
        <View style={styles.login_panel}>
            <TextInput 
                style={styles.text_input}
                placeholder="First Name"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Last Name"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Password"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Age"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Height"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Weight"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Email"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Password"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Confirm Password"
            />
            <Button
                style={styles.create_account_button}
                title="Create Account"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    </View>
    )
    function createUser(){
        
    }
}

const styles = StyleSheet.create({
    root:{
        backgroundColor: PHB_COLORS.DARK_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_text:{
        color: PHB_COLORS.WHITE,
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20
    },
    login_panel: {
        backgroundColor: PHB_COLORS.SLATE,
        width: '70%',
        alignSelf: 'center',
        padding: 10
    },
    text_input: {
        backgroundColor: PHB_COLORS.WHITE,
        margin: 5,
        padding: 5,
    },
    create_account_button:{
        margin: 1,
        padding: 30,
        borderWidth: 5
    },
    
})