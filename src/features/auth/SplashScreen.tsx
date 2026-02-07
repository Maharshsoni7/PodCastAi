import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { Colors } from '../../utils/Constants'
import { mmkvStorage } from '../../state/storage'
import { resetAndNavigate } from '../../utils/NavigationUtils'


const SplashScreen = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the next screen after 3 seconds
            const token = mmkvStorage.getItem('token')
            if (token) {
                resetAndNavigate('UserBottomTab')
            } else {
                resetAndNavigate('LoginScreen')
                // Navigate to the login screen if no token
                // navigationRef.navigate('LoginScreen')
            }
        }, 3000)

        // Clear the timer if the component unmounts before the timeout
        return () => clearTimeout(timer)
    }, [])
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icons/logo.png')} style={styles.logoImage} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: screenHeight * 0.6,
        width: screenWidth * 0.6,
        resizeMode: 'contain',
    }
})