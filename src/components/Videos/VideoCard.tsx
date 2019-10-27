import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import he from "he";
import moment from "moment";
import Youtube from "react-youtube";
import { Options } from "react-youtube";
import { YoutubeVideoData } from "../../redux/data_models";
import { CardContent, Card, CardHeader, CardActionArea, Collapse, Button, ButtonGroup, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { hideVideo } from "../../redux/data_actions";

interface OwnProps {
    video: YoutubeVideoData;
}

interface OwnState {
    videoOpen: boolean;
}
type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

export class VideoCard extends React.PureComponent<Props, OwnState> {
    constructor(props: Props){
        super(props);
        this.state = {
            videoOpen: false
        };

        this.handleOpenVideo = this.handleOpenVideo.bind(this);
    }

    handleOpenVideo = () => this.setState({videoOpen: !this.state.videoOpen});

    render() {
        const { video } = this.props;
        const opts: Options = {
            height: '315',
            width: '560',
            playerVars: {
                autoplay: 0
            }
        };
        return (
            <Grid item component={Card} key={video.id.videoId} md={12} xs>
                <CardHeader
                title={he.decode(video.snippet.title)}
                subheader={moment(video.snippet.publishedAt).format("DD.MM.YYYY HH:mm")}
                action={
                    <Button aria-label="hide" onClick={() => this.props.hideVideoId(this.props.video.id.videoId)}>
                        <NotInterestedIcon />
                    </Button>
                }
                />
                <CardActionArea>
                    <ButtonGroup fullWidth={true}>
                        <Button aria-label="open" onClick={this.handleOpenVideo}>
                            Watch
                            {!this.state.videoOpen && 
                                <ExpandMoreIcon />
                            }
                            {this.state.videoOpen && 
                                <ExpandLessIcon />
                            }
                        </Button>
                    </ButtonGroup>
                </CardActionArea>
                <Collapse in={this.state.videoOpen} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Youtube
                            opts={opts}
                            videoId={video.id.videoId}
                            onEnd={() => this.props.hideVideoId(this.props.video.id.videoId)}
                        />
                    </CardContent>
                </Collapse>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        hideVideoId: (videoId: string) => dispatch(hideVideo(videoId)),
    };

}

export default connect(null, mapDispatchToProps)(VideoCard);