import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { Colors } from '../../utils/Constants'


const SplashScreen = () => {
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