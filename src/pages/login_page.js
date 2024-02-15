import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function LoginPage({navigation}){
  return (
		<View style={[PHB_STYLES.root_container, styles.root]}>
			<Text style={styles.title_text}>Personal Health Buddy</Text>
			<View style={styles.login_panel}>
				<TextInput 
					style={styles.text_input}
					placeholder="Email"
				/>
				<TextInput 
					style={styles.text_input}
					placeholder="Password"
				/>
				<Button
					style={styles.login_button}
					title="Login"
					onPress={() => navigation.navigate('Home')}
				/>
				<Text style={styles.text}>Forgot Password</Text>

				<Text style={styles.text} onPress={() => navigation.navigate('CreateAccount')}>
					Create New Account
				</Text>
      
      </View>
    </View>
  )
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
        height: '50%',
        width: '70%',
        alignSelf: 'center',
        padding: 10
    },
    text_input: {
        backgroundColor: PHB_COLORS.WHITE,
        margin: 20,
        padding: 5,
    },
    login_button:{
        margin: 1,
        padding: 30,
        borderWidth: 5
    },
    text:{
        alignSelf: 'center',
        margin: 10
    }
})