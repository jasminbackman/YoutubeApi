import axios from 'axios';
import Immutable from "immutable";
import { YoutubeResponse, ChannelData, YoutubeVideoData } from "./data_models";
import { store } from '../store';
import { youtube, API_KEY, MAX_RESULT_COUNT } from "../constants/youtubeRequest";
import {
    loadData,
    loadDataDone,
    loadDataFail,
    loadChannelsDone,
} from "./data_actions";

export async function searchSelectedChannelVideos(){
    const channelIds = store.getState().selectedChannelIds;
    store.dispatch(loadData(channelIds));

    let requests: any[] = [];

    for(let i: number = 0; i < channelIds.length; i++){
        const channelId: string = channelIds[i];
        requests.push(youtube.get('/search',
        {
            params: {
                part: 'snippet',
                key: API_KEY,
                channelId: channelId,
                maxResults: MAX_RESULT_COUNT,
                order: "date"
        }}));
    }

    let results: Immutable.List<YoutubeVideoData> | undefined | void = await axios.all(requests)
    .then((result: any) => {
        try {
            const results = result.map((r: any) => Immutable.fromJS(r.data) as YoutubeResponse);
            return Immutable.List<YoutubeVideoData>(results.map((r: YoutubeResponse) => Immutable.get(r, "items", []))
            .reduce((prev: YoutubeVideoData[], current: YoutubeVideoData[]) =>{
                return prev.concat(current);
            }));
        }
        catch(ex){
            console.log("Warning! Could not parse youtube response: " + result);
        }
    })
    .catch(axios.spread((error: any) => {
        console.log(error.message);
    }));

    if(!results) {
        console.log("Warning! Failed to get youtube video data");
        store.dispatch(loadDataFail(["Failed to get youtube video data"]));
        return;
    }

    store.dispatch(loadDataDone(results));
}

export function loadChannels(){

    const demoChannelData: ChannelData[] = [
        {
            name: "Late Night with Seth Meyers",
            id: "UCVTyTA7-g9nopHeHbeuvpRA"
        },
        {
            name: "The Daily Show with Trevor Noah",
            id: "UCwWhs_6x42TyRM4Wstoq8HA"
        },
        {
            name: "The Late Show with Stephen Colbert",
            id: "UCMtFAi84ehTSYSE9XoHefig"
        }
    ];

    store.dispatch(loadChannelsDone(demoChannelData));
}