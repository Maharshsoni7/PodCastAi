import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { usePlayerStore } from '../../state/usePlayerStore'
import CustomText from '../ui/CustomText'
import { FlatList } from 'react-native-gesture-handler'

const PodcastList: FC<{ data: any[], title: string }> = ({ title, data }) => {

    const { user, currentPlayingPodcast, resetPlayer, setCurrentPlayingPodcast } = usePlayerStore()

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
            <CustomText variant='h4' fontFamily='Satoshi-Medium'>
                {title}
            </CustomText>
            <FlatList
                data={data}
                style={styles.flatListContainer}
                horizontal
                ListEmptyComponent={
                    <View style={styles.emptyContent}>
                        <CustomText variant='h4' fontFamily='Satoshi-Medium'>
                            No podcasts available
                        </CustomText>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { togglePlayPodcast(item) }}
                        style={styles.imageContainer}
                    >
                        <Image source={{ uri: item.artwork }} style={styles.image} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}


export default PodcastList

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    emptyContent: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        opacity: 0.5,
    },
    imageContainer: {
        marginRight: 15,
    },
    flatListContainer: {
        marginTop: 25,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 10,

    },
});