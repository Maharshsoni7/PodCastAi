import React, { createContext, useContext, ReactNode, FC } from "react"
import { useSharedValue, withTiming, SharedValue } from "react-native-reanimated"
import { screenHeight } from "../../utils/Scaling"
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constants"


interface SharedContextType {
    translationY: SharedValue<number>
    expandPlayer: () => void;
    collapsePlayer: () => void
}


const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60
const MAX_PLAYER_HEIGHT = screenHeight


const SharedStateContext = createContext<SharedContextType | undefined>(
    undefined
)

export const SharedStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const translationY = useSharedValue(0)
    const expandPlayer = () => {
        translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, {
            duration: 3000
        });

    }
    const collapsePlayer = () => {
        translationY.value = withTiming(0, {
            duration: 3000
        });
    }

    return (
        <SharedStateContext.Provider value={{ translationY, expandPlayer, collapsePlayer }}>
            {children}
        </SharedStateContext.Provider>
    )

};

export const useSharedState = () => {
    const context = useContext(SharedStateContext)

    if (context === undefined) {
        throw new Error('useSharedState must be use with SharedStateProvider')
    }
    return context
}