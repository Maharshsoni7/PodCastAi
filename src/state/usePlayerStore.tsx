import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface PlayerStore {
    user: null | any,
    setUser: (user: any) => void
    currentPlayingPodcast: Podcast | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    setCurrentPlayingPodcast: (podcast: Podcast | null) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setProgress: (progress: number) => void;
    setDuration: (duration: number) => void;
    resetPlayer: () => void;
}
interface Podcast {
    id: string;
    audio_uri: string;
    video_uri: string;
    title: string;
    lyricist: string;
    type: string;
    isFavourite: boolean;
    artist: any
    category: string;
    artwork: string;

}

export const usePlayerStore = create<PlayerStore>()(
    persist(
        set => ({
            user: null,
            setUser: (user: any) => set({ user }),
            currentPlayingPodcast: null,
            isPlaying: false,
            progress: 0,
            duration: 0,
            setCurrentPlayingPodcast: (podcast: Podcast | null) => set({ currentPlayingPodcast: podcast, isPlaying: true, progress: 0, duration: 0 }),
            setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
            setProgress: (progress: number) => set({ progress }),
            setDuration: (duration: number) => set({ duration }),
            resetPlayer: () => set({
                currentPlayingPodcast: null,
                isPlaying: false,
                progress: 0,
                duration: 0
            })
        }), {
        name: 'player-storage',
        storage: createJSONStorage(() => mmkvStorage)
    }
    )
)