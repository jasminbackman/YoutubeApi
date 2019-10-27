import { createStore } from 'redux'
import { videoData } from "./redux/data_reducers"

export const store = createStore(videoData);