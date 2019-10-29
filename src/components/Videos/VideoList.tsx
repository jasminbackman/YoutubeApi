import * as React from "react";
import Immutable from "immutable";
import VideoCard from "./VideoCard";
import VideoScreen from "./VideoScreen";
import { StickyContainer, Sticky } from 'react-sticky';
import { YoutubeVideoData } from "../../redux/data_models";
import { Grid, Box, List } from "@material-ui/core";
import { MAX_RESULT_COUNT } from "../../constants/youtubeRequest";

interface OwnProps {
    videos: Immutable.List<YoutubeVideoData>;
    hiddenVideoIds: string[];
    playingVideo: YoutubeVideoData | undefined;
}

export class VideoList extends React.PureComponent<OwnProps> {
    render() {
        const { videos, hiddenVideoIds, playingVideo } = this.props;

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
            <Grid item md={8} lg={8} sm={7} xs={6}>
                <StickyContainer>
                    <Sticky>
                        {({style}) => (
                            <Grid item md={12} lg={12} style={{...style, zIndex: 2000}}>
                                <VideoScreen 
                                    video={playingVideo}
                                />
                            </Grid>
                        )}
                    </Sticky>
                    <Grid item md={12} lg={12}>
                        <List style={{width: "100%" }}>
                        {videoData.map((video: YoutubeVideoData) => (
                            <VideoCard 
                                video={video} 
                                key={video.id.videoId}
                            />
                        ))}
                        </List>
                    </Grid>
                </StickyContainer>
            </Grid>
        )
    }
}

export default (VideoList);