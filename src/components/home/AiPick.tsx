import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { AI_PICK } from '../../graphQL/queries'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useLazyQuery } from '@apollo/client/react'
import CustomText from '../ui/CustomText'


const AiPick = () => {
    const { user, currentPlayingPodcast, resetPlayer, setCurrentPlayingPodcast } = usePlayerStore()
    const [fetching, setFetching] = useState(false)

    const [fetchAI, { data, loading, error }] = useLazyQuery(AI_PICK, {
        fetchPolicy: 'network-only',
    })

    const handleFetchAI = async () => {
        try {
            const res = await fetchAI({
                variables: { userId: user?.id },
            })

            console.log("AI Pick data:", res)
        } catch (err: any) {
            console.log("Apollo error:", err)
            console.log("GraphQL errors:", err?.graphQLErrors)
            console.log("Network error:", err?.networkError)
        }
    }
    console.log('AI Pick data:', error)
    const aiPodcast = data?.getRecommendedPodcasts?.[0]

    const togglePlayPodcast = async (item: any) => {
        if (currentPlayingPodcast?.id === item.id) {
            resetPlayer()
        }
        else {
            resetPlayer()
            setCurrentPlayingPodcast(item)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <CustomText variant='h2' fontFamily='Satoshi-Medium'>
                    Lets podcast AI Pick Best for you !
                </CustomText>
                <TouchableOpacity style={styles.button} onPress={handleFetchAI}>
                    <CustomText fontFamily='Satoshi-Medium' >Let's Go</CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.section2}>
                {fetching || loading ? (
                    <ActivityIndicator size="large" color="#ccc" />
                ) : error ? (
                    <CustomText>Error fetching AI Pick</CustomText>
                ) :
                    <TouchableOpacity style={styles.img} onPress={() => {
                        if (aiPodcast?.artwork) {
                            togglePlayPodcast(aiPodcast)
                        }
                        else {
                            handleFetchAI()
                        }
                    }}>
                        <Image
                            source={aiPodcast?.artwork ? { uri: aiPodcast.artwork } : require('../../assets/icons/profile.jpeg')}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default AiPick

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 160
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    section: {
        width: '45%',
    },
    button: {
        backgroundColor: '#222',
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',

    },
    section2: {
        width: '45%',
        borderWidth: 1,
        height: 150,
        borderColor: '#ccc',
        overflow: 'hidden',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    }
})