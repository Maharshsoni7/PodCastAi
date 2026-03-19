import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import { Colors } from '../../utils/Constants'
import { fontR, screenHeight } from '../../utils/Scaling'
import CustomHeader from '../../components/ui/CustomHeader'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useQuery } from '@apollo/client/react'
import { GET_PODCASTS } from '../../graphQL/queries'
import Icon from '../../components/ui/Icon'
import CustomText from '../../components/ui/CustomText'
import PodcastItem from '../../components/podcast/PodcastItem'


const SearchScreen = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const inputRef = useRef<TextInput>(null)
    const { user } = usePlayerStore()

    const { data, loading, error, refetch } = useQuery(GET_PODCASTS, {
        variables: {
            where: {
                title: {
                    contains: searchQuery,
                },
            },
            userId: user?.id
        },
        skip: !user?.id,
    })

    const handleSearch = (text: string) => {
        setSearchQuery(text)

        refetch({
            where: {
                title: {
                    contains: text,
                },
            },
            userId: user?.id
        })
    }

    const renderPodcastItem = ({ item }: { item: any }) => {
        const isFavorite = item?.favoriteBy?.length > 0
        return <PodcastItem item={{ ...item, isFavorite }} />


    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            inputRef.current?.blur()
        }}
            accessible={false}
        >
            <CustomSafeAreaView>
                <CustomHeader title='Search' />

                <View style={styles.searchContainer}>
                    <Icon name='search' iconFamily='Ionicons' size={20} color={'#fff'} />
                    <TextInput
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder='Search podcasts...'
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#ccc" />
                ) : error ? (
                    <CustomText>Error fetching AI Pick {error.message}</CustomText>
                ) :
                    <FlatList
                        data={data?.podcasts || []}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <CustomText variant='h4' fontFamily='Satoshi-Medium'>
                                    No podcasts found for "{searchQuery}"
                                </CustomText>
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderPodcastItem}
                        style={{ paddingTop: 20 }}
                    />
                }
            </CustomSafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.backgroundDark,
        borderRadius: 100,
        marginTop: 25
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: fontR(14),
        color: '#fff'
    },
    emptyContainer: {
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#fff'
    },

    errorText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    }

})
