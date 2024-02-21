import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


/* Form Validation */
const schema = yup.object().shape({
    Email: yup.string().email("Invalid email").required("Email is required"),
    Password: yup.string().required("Please enter your password")
})


export function LoginPage({navigation}){
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            "Email": '',
            "Password": ''
        },
        reValidateMode: 'onSubmit'
    })

    console.log("errors: ", errors)


    function login(data) {
        console.log("SUBMITTED");
        console.log(data);

        // api call to login
        fetch("http://192.168.0.25:8000/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(JSON.stringify(responseData)); // logs the server response which should be 200 if successful
        })
        .catch((error) => console.error('Error:', error));
    }


  return (
		<View style={[PHB_STYLES.root_container, styles.root]}>
			<Text style={styles.title_text}>Personal Health Buddy</Text>
			<View style={styles.login_panel}>
                
                <Controller
                    control={control}
                    name="Email"
                    render={({ field, value }) =>(
                        <TextInput 
                            value={value}
                            style={styles.text_input}
                            placeholder="Email"
                            onChangeText={value => field.onChange(value)}
                        />
                    )}
                />
                <Text style={styles.error_text}>{errors.Email?.message}</Text> 
                <Controller
                    control={control}
                    name="Password"
                    render={({ field, value }) =>(
                        <TextInput 
                            value={value}
                            style={styles.text_input}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={value => field.onChange(value)}
                        />
                    )}
                />
                <Text style={styles.error_text}>{errors.Password?.message}</Text> 
				<Button
					style={styles.login_button}
					title="Login"
					onPress={handleSubmit(login)}
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
    },
    error_text:{
        alignSelf: 'center'
    }
})