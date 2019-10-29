import { createStore } from 'redux';
import { videoData } from "./data_reducers";

export const store = createStore(videoData);