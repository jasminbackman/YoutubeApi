import { Box, Chip, Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import he from "he";
import * as React from "react";
import { connect } from "react-redux";
import Youtube, { Options } from "react-youtube";
import { Dispatch } from "redux";
import { stopVideo } from "../../redux/data_actions";
import { YoutubeVideoData } from "../../redux/data_models";

interface OwnProps {
    video: YoutubeVideoData | undefined;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

export class VideoScreen extends React.PureComponent<Props> {
    render() {
        const { video, stopVideo } = this.props;
        const opts: Options = {
            height: '400',
            width: '100%',
            playerVars: {
                autoplay: 1
            }
        };

        let title = video !== undefined ? he.decode(video.snippet.channelTitle) + " - " + he.decode(video.snippet.title) : "";

        return (
            <Paper id="videoScreen" style={{ backgroundColor: "dark", minWidth: "100%", position: "relative" }}>
                {video !== undefined &&
                    <Box>
                        <Box p={2} pb={1}>
                            <Grid container justify="space-between">
                                <Chip label="Now playing" color="secondary" style={{ marginRight: "10px" }} />
                                <Tooltip title={title} placement="left">
                                    <Typography variant="h6" component="h6">
                                        {
                                            title.length > 80 ? title.substring(0, 77) + "..." : title
                                        }
                                    </Typography>
                                </Tooltip>
                                <IconButton
                                    className="no-padding"
                                    component={IconButton}
                                    children={<CloseIcon />}
                                    onClick={() => stopVideo()}
                                />
                            </Grid>
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

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        stopVideo: () => dispatch(stopVideo())
    };

}

export default connect(null, mapDispatchToProps)(VideoScreen);