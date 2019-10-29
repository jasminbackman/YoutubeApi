import { Box, Grid, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { connect } from "react-redux";
import '../App.css';
import { RootState } from "../redux/data_reducers";
import { ChannelList } from "./Channels/ChannelList";
import { VideoList } from "./Videos/VideoList";

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
                            <CircularProgress />
                        </Box>
                    }
                />
            </MuiThemeProvider>
        )
    }
}

// Better way of using these state props would've been to map them this way inside the components
// that actually need them (same way as dispatch props have been given to VideoCard component for example),
// but I was unable to find a solution to this issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16990
// and therefore the state props are passed to children from this component.
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
