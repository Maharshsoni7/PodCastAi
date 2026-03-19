import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '../../utils/Constants'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useFavouriteStore } from '../../state/useFavouriteStore'
import { useMutation } from '@apollo/client/react'
import { MARK_FAVOURITE, UNMARK_FAVOURITE } from '../../graphQL/queries'
import { resetAndNavigate } from '../../utils/NavigationUtils'

import CustomText from '../ui/CustomText'
import { fontR } from '../../utils/Scaling'
import Icon from '../ui/Icon'


interface PodcastItemProps {
    item: any,
    onNavigate?: boolean
}

const PodcastItem: FC<PodcastItemProps> = ({ item, onNavigate }) => {
    const { user, currentPlayingPodcast, resetPlayer, setCurrentPlayingPodcast } = usePlayerStore()
    const { favoritesPodcast, toggleFavorite } = useFavouriteStore()
    console.log("favoritesPodcast", favoritesPodcast)
    const isFavorite = favoritesPodcast.some((fav) => fav.id === item.id)
    const isActive = currentPlayingPodcast?.id === item.id

    const [markedFavorite] = useMutation(MARK_FAVOURITE, {})
    const [markedUnfavorite] = useMutation(UNMARK_FAVOURITE, {})

    const togglePlayPodcast = async () => {
        if (currentPlayingPodcast?.id === item.id) {
            resetPlayer()
        }
        else {
            resetPlayer()
            setCurrentPlayingPodcast(item)
        }
    }

    const handleToggleFavorite = async (podcast: any) => {
        // toggleFavorite(item)
        const isFavorite = favoritesPodcast.some((fav) => fav.id === podcast.id)
        toggleFavorite(podcast)
        console.log(`Toggling favorite for podcast ${user.name}. Currently favorite: ${isFavorite}`)
        try {
            if (!isFavorite) {
                await markedFavorite({
                    variables: {
                        userId: user?.id,
                        podcastId: item.id,
                    },
                })
            } else {
                await markedUnfavorite({
                    variables: {
                        userId: user?.id,
                        podcastId: item.id,
                    },
                })
            }
        } catch (error) {
            console.error("Error toggling favorite:", error)
            toggleFavorite(podcast)
        }


    }
    return (
        <TouchableOpacity activeOpacity={0.8}
            style={styles.container}
            onPress={() => {
                togglePlayPodcast()
                if (onNavigate) {
                    resetAndNavigate('UserBottomTab')
                }
            }}
        >
            <View style={styles.flexRowBetween}>
                <View style={styles.flexRow}>
                    <Image source={{ uri: item.artwork }} style={styles.img} />
                    <View style={styles.PodcastInfo}>
                        <CustomText numberOfLines={1}
                            fontSize={fontR(9)}
                            fontFamily={Fonts.Medium}
                            style={{ color: isActive ? Colors.primary : Colors.text }}
                        >
                            {item.title}

                        </CustomText>

                        <CustomText numberOfLines={1}
                            fontSize={fontR(8)}
                            fontFamily={Fonts.Medium}
                            style={{ opacity: 0.8, marginTop: 2 }}
                        >
                            {item?.artist?.name}

                        </CustomText>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
                        <Icon name={isFavorite ? 'heart' : 'heart-outline'} iconFamily='Ionicons' size={24} color={isFavorite ? Colors.primary : Colors.text} />
                    </TouchableOpacity>
                </View>
            </View>



        </TouchableOpacity>
    )
}
export default PodcastItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.backgroundDark,
        marginVertical: 5,
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    img: {
        borderRadius: 5,
        width: 45,
        height: 45,
        resizeMode: 'cover',
    },
    PodcastInfo: {
        width: '65%',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
});