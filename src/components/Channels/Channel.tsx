import * as React from "react";
import { Dispatch } from 'redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ChannelData } from "../../redux/data_models";
import CheckIcon from '@material-ui/icons/Check';
import { ListItemIcon } from "@material-ui/core";
import { selectChannel, deselectChannel } from "../../redux/data_actions";
import { connect } from "react-redux";

interface OwnProps{
    data: ChannelData;
    selected: boolean;
}
type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

export class Channel extends React.PureComponent<Props> {
    constructor(props: any){
        super(props);
        this.state = {
            selected: false
        };
        
        this.toggleSelectionState = this.toggleSelectionState.bind(this);
    }

    toggleSelectionState(){
        const { selectChannelId, deselectChannelId, data, selected } = this.props;
        if(!selected) {
            selectChannelId(data.id);
        }
        else {
            deselectChannelId(data.id);
        }
    }

    render() {
        const { data, selected } = this.props;
        return (
            <ListItem button 
            key={data.id} 
            onClick={this.toggleSelectionState}>
                {selected && 
                    <ListItemIcon>
                        <CheckIcon />
                    </ListItemIcon>
                }
                <ListItemText primary={data.name} />
            </ListItem>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        selectChannelId: (channelId: string) => dispatch(selectChannel(channelId)),
        deselectChannelId: (channelId: string) => dispatch(deselectChannel(channelId))
    };

}

export default connect(null, mapDispatchToProps)(Channel);