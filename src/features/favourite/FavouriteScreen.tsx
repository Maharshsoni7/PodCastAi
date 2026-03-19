import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import { useFavouriteStore } from '../../state/useFavouriteStore'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useQuery } from '@apollo/client/react'
import { GET_USER_FAVOURITE } from '../../graphQL/queries'
import CustomHeader from '../../components/ui/CustomHeader'
import { fontR, screenHeight } from '../../utils/Scaling'
import PodcastItem from '../../components/podcast/PodcastItem'
import Icon from '../../components/ui/Icon'
import CustomText from '../../components/ui/CustomText'



const FavouriteScreen = () => {

  const { user, currentPlayingPodcast, resetPlayer, setCurrentPlayingPodcast } = usePlayerStore()
  const { favoritesPodcast, toggleFavorite } = useFavouriteStore()

  const { data, loading, error } = useQuery(GET_USER_FAVOURITE, {
    variables: { userId: user.id },
    skip: !user.id
  })
  console.log("FavoriteScreen data:", data)

  const renderPodcastItem = ({ item }: { item: any }) => {
    const isFavorite = item?.favoriteBy?.length > 0
    return <PodcastItem item={{ ...item, isFavorite }} />
  }
  if (loading) {
    return (
      <CustomSafeAreaView>
        <CustomHeader title='My Favorite' />
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>

      </CustomSafeAreaView>
    )
  }
  console.log('error', error)
  if (error) {
    return (
      <CustomSafeAreaView>
        <CustomHeader title='My Favorite' />
        <View style={styles.center}>
          <CustomText>`Failed to load favorites. Please try again`</CustomText>
        </View>

      </CustomSafeAreaView>
    )

  }
  return (
    <CustomSafeAreaView>
      <CustomHeader title='My Favorite' />
      <FlatList
        data={data.user?.favoritePodcasts || []}
        ListEmptyComponent={
          <View style={styles.container}>
            <Icon name='mic' iconFamily='Ionicons' size={fontR(40)} />
            <CustomText variant='h5'>No favorite Podcast Found.</CustomText>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPodcastItem}
        style={{ paddingTop: 20 }}
      />
    </CustomSafeAreaView>
  )
}
export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})