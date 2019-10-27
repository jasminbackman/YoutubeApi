import * as React from "react";
import List from '@material-ui/core/List';
import { ChannelData } from "../../redux/data_models";
import { loadChannels, searchSelectedChannelVideos } from "../../redux/data_functions";
import { ListSubheader, Button, ButtonGroup, Drawer } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Channel from "./Channel";
interface OwnProps {
    channels: ChannelData[];
    selectedChannelIds: string[];
}

type Props = OwnProps;

export class ChannelList extends React.PureComponent<Props> {

    render() {
        const { channels, selectedChannelIds } = this.props;

        return (
            <Drawer
                className="drawer"
                variant="persistent"
                anchor="left"
                open={true}
            >
                <List>
                    <ListSubheader>
                        Your channels
                    </ListSubheader>
                    {channels.map((val: ChannelData) => (
                        <Channel 
                        data={val} 
                        key={val.id}
                        selected={selectedChannelIds.indexOf(val.id) > -1} />
                    ))}
                </List>
                <ButtonGroup fullWidth={true}>
                    <Button onClick={() => searchSelectedChannelVideos()}><SearchIcon/>Search</Button>
                    <Button onClick={() => loadChannels()}><AddIcon />Add channels</Button>
                </ButtonGroup>
            </Drawer>
        )
    }
}

export default (ChannelList);