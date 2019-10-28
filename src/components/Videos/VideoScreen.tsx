import * as React from "react";
import he from "he";
import Youtube from "react-youtube";
import { Options } from "react-youtube";
import { Paper, Typography, Box, Chip } from "@material-ui/core";
import { YoutubeVideoData } from "../../redux/data_models";

interface OwnProps {
    video: YoutubeVideoData | undefined;
}

type Props = OwnProps;

export class VideoScreen extends React.PureComponent<Props> {
    render() {
        const { video } = this.props;
        const opts: Options = {
            height: '400',
            width: '100%',
            playerVars: {
                autoplay: 1
            }
        };
        return (
            <Paper id="videoScreen" style={{backgroundColor: "dark", minWidth: "100%", position: "relative"}}>
                {video !== undefined && 
                    <Box>
                        <Box p={2} display="flex" alignItems="center">
                            <Chip label="Now playing" color="secondary" style={{marginRight: "10px"}} />
                            <Typography variant="h6" component="h6">
                                {
                                    he.decode(video.snippet.channelTitle) + " - " +
                                    he.decode(video.snippet.title)
                                }
                            </Typography>
                        </Box>
                        <Youtube
                            opts={opts}
                            videoId={video.id.videoId}
                        />
                    </Box>
                }
            </Paper>
        )
    }
}

export default (VideoScreen);