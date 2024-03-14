import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../authContext';

/* Form Validation */
const userSchema = yup.object().shape({

    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    age: yup.number().required().positive("Invalid age").integer("Age is required"),
    height: yup.number().required("Height is required").positive("Invalid height"),
    weight: yup.number().required("Weight is required").positive("Invalid weight"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
})

/* API call to backend */
function createUser(data, setUser) {
    console.log("Create user");
    console.log(data);

    // api call to create user http://18.226.94.38:8000/api/create-user
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
            "age": 0,
            "height": 0,
            "weight": 0,
            "email": '',
            "password": '',
        },
        reValidateMode: 'onSubmit'
    })


    const {currentUser, setCurrentUser} = useContext(AuthContext);

    return (
    <View style={[PHB_STYLES.root_container, styles.root]}>
        <Text style={styles.title_text}>Personal Health Buddy</Text>
        <View style={styles.login_panel}>
            <Text style={styles.error_text}>{errors.first_name?.message}</Text> 
            <Controller
                control={control}
                name="first_name"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="First Name"
                        onChangeText={value => field.onChange(value)}
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.last_name?.message}</Text> 
            <Controller
                control={control}
                name="last_name"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Last Name"
                        onChangeText={value => field.onChange(value)}
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.age?.message}</Text> 
            <Controller
                control={control}
                name="age"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Age"
                        onChangeText={value => field.onChange(value)}
                        inputMode='numeric'
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.height?.message}</Text> 
            <Controller
                control={control}
                name="height"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Height (cm)"
                        onChangeText={value => field.onChange(value)}
                        inputMode='numeric'
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.weight?.message}</Text> 
            <Controller
                control={control}
                name="weight"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Weight (kg)"
                        onChangeText={value => field.onChange(value)}
                        inputMode='numeric'
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.email?.message}</Text> 
            <Controller
                control={control}
                name="email"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Email"
                        onChangeText={value => field.onChange(value)}
                        secureTextEntry={true}
                    />
                )}
            />
            <Text style={styles.error_text}>{errors.password?.message}</Text> 
            <Controller
                control={control}
                name="password"
                render={({ field, value }) =>(
                    <TextInput 
                        value={value}
                        style={styles.text_input}
                        placeholder="Password"
                        onChangeText={value => field.onChange(value)}
                        secureTextEntry={true}
                    />
                )}
            />
            <Text style={styles.error_text}> {errors.password?.message}</Text> 
            <TextInput 
                style={styles.text_input}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Text style={styles.error_text}> </Text> 
            <Button
                style={styles.create_account_button}
                title="Create Account"
                onPress={handleSubmit((data) => createUser(data, setCurrentUser))}
            />
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
    error_text:{
        alignSelf: 'center',
        fontSize: 13,
        color:'darkred'
    },
})