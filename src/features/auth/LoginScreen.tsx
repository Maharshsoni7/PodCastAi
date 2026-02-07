import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import CustomText from '../../componnents/ui/CustomText'
import { navigate } from '../../utils/NavigationUtils'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        // Handle login logic here
    }
    const handleRegister = () => {
        navigate('RegisterScreen')
        // Handle navigation to register screen here
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icons/logo.png')} style={styles.logoImage} />
            <CustomText variant="h3" style={styles.header}>
                Login
            </CustomText>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                placeholderTextColor={Colors.text}
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor={Colors.inactive}
                style={styles.input}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <CustomText variant='h5' style={styles.buttonText}>{false ? 'Logging in...' : 'Login'}</CustomText>
            </TouchableOpacity>


            <TouchableOpacity onPress={handleRegister} >
                <CustomText variant='h6' style={styles.signUpText}>Don't have an account? Sign Up</CustomText>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoImage: {
        height: screenHeight * 0.15,
        width: screenWidth * 0.6,
        marginTop: 50,
        resizeMode: 'contain',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.backgroundLight,
        borderRadius: 8,
        paddingHorizontal: 15,
        color: Colors.text,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: Colors.background,

    },
    signUpText: {
        marginTop: 15,
        color: Colors.primary,
    }
})
export default LoginScreen
