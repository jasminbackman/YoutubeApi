import * as React from "react";
import Immutable from "immutable";
import VideoCard from "./VideoCard";
import { YoutubeVideoData } from "../../redux/data_models";
import { Grid, Box } from "@material-ui/core";
import { MAX_RESULT_COUNT } from "../../constants/youtubeRequest";

interface OwnProps {
    videos: Immutable.List<YoutubeVideoData>;
    hiddenVideoIds: string[]
}

export class VideoList extends React.PureComponent<OwnProps> {
    render() {
        const { videos, hiddenVideoIds } = this.props;

        const videoData: YoutubeVideoData[] = this.props.videos === null ? [] :
        videos.toJS().filter((video: YoutubeVideoData) => {
            return video.id !== null && video.snippet !== null && hiddenVideoIds.indexOf(video.id.videoId) < 0;
        }).sort((a: YoutubeVideoData, b: YoutubeVideoData) => {
            if(a.snippet.publishedAt > b.snippet.publishedAt) {
                return -1;
            }

            if(a.snippet.publishedAt < b.snippet.publishedAt) {
                return 1;
            }

            return 0;
        }).slice(0, Math.min(MAX_RESULT_COUNT, this.props.videos.size)); 

        return (
            <Box id="main">
                <Grid container>
                    {videoData.map((video: YoutubeVideoData) => (
                        <VideoCard video={video} key={video.id.videoId} />
                    ))}
                </Grid>
            </Box>
        )
    }
}

export default (VideoList);