import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../authContext';

/* Form Validation */
const userSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    height: yup.number().required().positive(),
    weight: yup.number().required().positive(),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required()
})

/* API call to backend */
function createUser(data, setUser) {
    console.log("Create user");
    console.log(data);

    // api call to create user
    fetch("http://18.226.94.38:8000/api/create-user", {
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
        if (responseData.success === true) {
            console.log("account created, user=" + responseData['user-id']);
            setUser(responseData['user-id'])
        }
        else {
            console.log("account creation failed");
        }
    })
    .catch((error) => console.error('Error:', error));
}


export function CreateAccountPage({navigation}){

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            "first_name": '',
            "last_name": '',
            "password": '',
            "age": 0,
            "height": 0,
            "weight": 0,
            "username": '',
        },
        reValidateMode: 'onSubmit'
    })

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
                placeholder="Height (cm)"
            />
            <TextInput 
                style={styles.text_input}
                placeholder="Weight (kg)"
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