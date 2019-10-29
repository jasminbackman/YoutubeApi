import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import he from "he";
import moment from "moment";
import { YoutubeVideoData } from "../../redux/data_models";
import { Card, CardHeader, Button, ButtonGroup, Grid, Typography, Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { hideVideo, playVideo } from "../../redux/data_actions";

interface OwnProps {
    video: YoutubeVideoData;
}
type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

export class VideoCard extends React.PureComponent<Props> {
    constructor(props: Props){
        super(props);

        this.handleActionButton = this.handleActionButton.bind(this);
    }

    handleActionButton(){
        const { playVideo, hideVideoId, video } = this.props;
        playVideo(video);
        hideVideoId(video.id.videoId);
    }

    render() {
        const { video, hideVideoId } = this.props;
        const buttonStyle = {
            border: 0,
        };
        return (
            <Grid item md={12} xs style={{marginBottom: "10px"}}>
                <Card>
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
                                <Tooltip title="Play" placement="bottom">
                                    <Button 
                                        className="playButton"
                                        aria-label="open" 
                                        onClick={this.handleActionButton} 
                                        style={buttonStyle}
                                    >
                                        <PlayCircleFilledIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Hide" placement="bottom">
                                    <Button aria-label="hide" onClick={() => hideVideoId(video.id.videoId)} style={buttonStyle}>
                                        <VisibilityOffIcon />
                                    </Button>
                                </Tooltip>
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
        playVideo: (video: YoutubeVideoData) => dispatch(playVideo(video))
    };

}

export default connect(null, mapDispatchToProps)(VideoCard);