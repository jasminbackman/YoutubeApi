import { actionTypes } from "./data_actions";
import Immutable from "immutable";
import { ChannelData, YoutubeVideoData } from "./data_models";

export interface RootState {
    loading: boolean;
    data: Immutable.List<YoutubeVideoData>;
    error: string | null;
    channels: ChannelData[];
    selectedChannelIds: string[];
    hiddenVideoIds: string[];
    playingVideo: YoutubeVideoData | undefined;
}

const initialState: RootState = {
    loading: false,
    data: Immutable.List<YoutubeVideoData>(),
    error: null,
    channels: [],
    selectedChannelIds: [],
    hiddenVideoIds: [],
    playingVideo: undefined
};

export function videoData(state: RootState = initialState, action: any) {
    switch (action.type) {
      case actionTypes.LOAD_DATA:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                data: null,
                error: null
            })
      case actionTypes.LOAD_DONE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                data: action.data,
                error: null
            })
       case actionTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                error: action.error
            })
        case actionTypes.LOAD_CHANNELS_DONE:
            return Object.assign({}, state, {
                ...state,
                channels: action.data
            })
        case actionTypes.SELECT_CHANNEL:
            let selections: string[] = state.selectedChannelIds.indexOf(action.channelId) < 0 ? 
            state.selectedChannelIds.concat(action.channelId) : state.selectedChannelIds;
            return Object.assign({}, state, {
                ...state,
                selectedChannelIds: selections
            })
        case actionTypes.DESELECT_CHANNEL:
            return Object.assign({}, state, {
                ...state,
                selectedChannelIds: state.selectedChannelIds.filter(s => s !== action.channelId)
            })
        case actionTypes.HIDE_VIDEO:
            let hiddenIds: string[] = state.hiddenVideoIds.indexOf(action.videoId) < 0 ? 
            state.hiddenVideoIds.concat(action.videoId) : state.hiddenVideoIds;
            return Object.assign({}, state, {
                ...state,
                hiddenVideoIds: hiddenIds 
            })
        case actionTypes.PLAY_VIDEO:
            return Object.assign({}, state, {
                ...state,
                playingVideo: state.hiddenVideoIds.indexOf(action.video.id.videoId) > -1 ? state.playingVideo : action.video 
            })
        case actionTypes.STOP_VIDEO:
            return Object.assign({}, state, {
                ...state,
                playingVideo: undefined
            })

      default:
        return state
    }
}