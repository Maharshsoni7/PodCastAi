import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Podcast {
    id: string;
    audio_uri: string;
    video_uri: string;
    title: string;
    lyricist: string;
    type: string;
    isFavorite: boolean;
    artist: any;
    category: string;
    artwork: string;
}

interface FavouriteStore {
    favoritesPodcast: Podcast[];
    toggleFavorite: (podcast: Podcast) => void;
    updateFavorite: (podcast: Podcast, isFavorite: boolean) => void;
}

export const useFavouriteStore = create<FavouriteStore>()(
    persist(
        (set, get) => ({
            favoritesPodcast: [],

            toggleFavorite: (podcast) => {
                const favorites = get().favoritesPodcast;

                const isCurrentlyFavorite = favorites.some(
                    fav => fav.id === podcast.id
                );

                set({
                    favoritesPodcast: isCurrentlyFavorite
                        ? favorites.filter(fav => fav.id !== podcast.id)
                        : [...favorites, podcast],
                });
            },

            updateFavorite: (podcast, isFavorite) => {
                set((state) => ({
                    favoritesPodcast: isFavorite
                        ? [...state.favoritesPodcast, podcast]
                        : state.favoritesPodcast.filter(fav => fav.id !== podcast.id),
                }));
            },
        }),
        {
            name: 'favourite-storage',
        }
    )
);