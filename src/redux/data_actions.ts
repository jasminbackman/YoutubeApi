import Immutable from "immutable";
import { ChannelData, YoutubeVideoData } from "./data_models"

export const actionTypes = {
    LOAD_DATA: 'LOAD_DATA',
    LOAD_DONE: 'LOAD_DONE',
    LOAD_FAIL: 'LOAD_FAIL',
    LOAD_CHANNELS: 'LOAD_CHANNELS',
    LOAD_CHANNELS_DONE: 'LOAD_CHANNELS_DONE',
    SELECT_CHANNEL: 'SELECT_CHANNEL',
    DESELECT_CHANNEL: 'DESELECT_CHANNEL',
    HIDE_VIDEO: 'HIDE_VIDEO'
};

export const loadData = (channelIds: string[]) => ({
    type: actionTypes.LOAD_DATA,
    channelIds
});

export const loadDataDone = (data: Immutable.List<YoutubeVideoData>) => ({
    type: actionTypes.LOAD_DONE,
    data
});

export const loadDataFail = (errorMessages: string[]) => ({
    type: actionTypes.LOAD_FAIL,
    errorMessages
});

export const loadChannelsDone = (data: ChannelData[]) => ({
    type: actionTypes.LOAD_CHANNELS_DONE,
    data
});

export const selectChannel = (channelId: string) => ({
    type: actionTypes.SELECT_CHANNEL,
    channelId
});

export const deselectChannel = (channelId: string) => ({
    type: actionTypes.DESELECT_CHANNEL,
    channelId
});

export const hideVideo = (videoId: string) => ({
    type: actionTypes.HIDE_VIDEO,
    videoId
});