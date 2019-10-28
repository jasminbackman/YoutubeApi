import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import he from "he";
import moment from "moment";
import { YoutubeVideoData } from "../../redux/data_models";
import { Card, CardHeader, Button, ButtonGroup, Grid, Box, Typography } from "@material-ui/core";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { hideVideo, playVideo, stopVideo } from "../../redux/data_actions";

interface OwnProps {
    video: YoutubeVideoData;
    playing: boolean;
}
type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

export class VideoCard extends React.PureComponent<Props> {
    constructor(props: Props){
        super(props);

        this.handleActionButton = this.handleActionButton.bind(this);
    }

    handleActionButton(){
        const { playing, stopVideo, playVideo, video } = this.props;
        if(playing) {
            stopVideo();
        }
        else {
            playVideo(video);
        }
    }

    render() {
        const { video, hideVideoId, playing } = this.props;
        const buttonStyle = {
            border: 0,
        };
        return (
            <Grid item md={12} xs style={{marginBottom: "10px"}}>
                <Card className={playing ? "playing" : ""}>
                    <CardHeader
                    title={
                        <Typography variant="h6" component="h6">
                            {
                                he.decode(video.snippet.channelTitle) + " - " +
                                he.decode(video.snippet.title)
                            }
                        </Typography>
                    }
                    subheader={moment(video.snippet.publishedAt).format("DD.MM.YYYY HH:mm")}
                    action={
                        <ButtonGroup>
                            <Button 
                            aria-label="open" 
                            onClick={this.handleActionButton} 
                            style={buttonStyle}
                            className={playing ? "playing" : ""}>
                                {!playing && 
                                    <PlayCircleFilledIcon />
                                }
                                {playing && 
                                    <StopIcon />
                                }
                            </Button>
                            <Button aria-label="hide" onClick={() => hideVideoId(video.id.videoId)} style={buttonStyle}>
                                <NotInterestedIcon />
                            </Button>
                        </ButtonGroup>
                    }
                    />
                </Card>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        hideVideoId: (videoId: string) => dispatch(hideVideo(videoId)),
        playVideo: (video: YoutubeVideoData) => dispatch(playVideo(video)),
        stopVideo: () => dispatch(stopVideo())
    };

}

export default connect(null, mapDispatchToProps)(VideoCard);