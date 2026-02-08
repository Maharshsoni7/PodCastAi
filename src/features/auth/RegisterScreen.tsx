import { View, StyleSheet, Image, TextInput, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import CustomText from '../../componnents/ui/CustomText'
import { navigate } from '../../utils/NavigationUtils'

import { useMutation } from '@apollo/client/react'
import { REGISTER_MUTATION } from '../../graphQL/queries'
const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleRegister = async () => {
    try {
      const { data } = await registerMutation({
        variables: {
          name, email, password, confirmPassword
        },
      })
      if (data?.registerUser?.user) {
        navigate('LoginScreen')
      }

    } catch (err) {
      console.error('Registration error:', err)
      // Alert.alert('Registration Error', error?.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/logo.png')} style={styles.logoImage} />
      <CustomText variant="h3" style={styles.header}>
        Register
      </CustomText>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Name'
        placeholderTextColor={Colors.text}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
        placeholderTextColor={Colors.text}
        style={styles.input}
        keyboardType='email-address'
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        placeholderTextColor={Colors.inactive}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder='Confirm Password'
        placeholderTextColor={Colors.inactive}
        style={styles.input}
        secureTextEntry
      />
      {error && <CustomText variant='body' style={{ color: 'red', marginBottom: 10 }}>Error: {error.message}</CustomText>}

      <TouchableOpacity style={styles.button} onPress={handleRegister} >
        <CustomText variant='h5' style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</CustomText>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigate('LoginScreen')} >
        <CustomText variant='h6' style={styles.signUpText}>Already have an account? Login</CustomText>
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
export default RegisterScreen
