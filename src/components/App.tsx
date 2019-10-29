import * as React from "react";
import '../App.css';
import { connect } from "react-redux";
import { Container, Grid, Snackbar, Box } from '@material-ui/core';
import { ChannelList } from "./Channels/ChannelList";
import { VideoList } from "./Videos/VideoList";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { RootState } from "../redux/data_reducers";
import CircularProgress from '@material-ui/core/CircularProgress';

const muiTheme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = {} & StateProps;

export class App extends React.PureComponent<Props> {
    render() {
        return (
        <MuiThemeProvider theme={muiTheme}>
            <Grid container>
                <ChannelList 
                    channels={this.props.channels}
                    selectedChannelIds={this.props.selectedChannelIds}
                />
                <Grid item md={3} lg={3} sm={5} xs={6}></Grid>
                <VideoList
                    videos={this.props.videos}
                    hiddenVideoIds={this.props.hiddenVideoIds}
                    playingVideo={this.props.playingVideo}
                />
            </Grid>
            <Snackbar
                open={this.props.loading}
                message={
                    <Box 
                    display="flex" 
                    alignItems="center" 
                    flexGrow={1} 
                    justifyContent="center">
                        <CircularProgress/>
                    </Box>
                }
            />
        </MuiThemeProvider>
        )
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        channels: state.channels,
        selectedChannelIds: state.selectedChannelIds,
        videos: state.data,
        hiddenVideoIds: state.hiddenVideoIds,
        playingVideo: state.playingVideo,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(App);
