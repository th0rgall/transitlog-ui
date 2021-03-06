import React from "react";
import Input from "../Input";
import {text, Text} from "../../helpers/text";
import {ControlGroup, Button} from "../Forms";
import {inject, observer} from "mobx-react";
import {app} from "mobx-app";
import AllStopsQuery from "../../queries/AllStopsQuery";
import StopInput from "./StopInput";
import Tooltip from "../Tooltip";

@inject(app("Filters"))
@observer
class StopSettings extends React.Component {
  render() {
    const {Filters, state} = this.props;
    const {stop} = state;

    return (
      <>
        <ControlGroup>
          <Input label={text("filterpanel.filter_by_stop")} animatedLabel={false}>
            <AllStopsQuery>
              {({stops, loading, search}) => (
                <StopInput
                  search={search}
                  onSelect={Filters.setStop}
                  stop={stop}
                  stops={stops}
                  loading={loading}
                />
              )}
            </AllStopsQuery>
          </Input>
        </ControlGroup>
        {!!stop && (
          <Tooltip helpText="Clear stop">
            <Button primary={false} small={true} onClick={() => Filters.setStop("")}>
              <Text>filterpanel.clear.stop</Text>
            </Button>
          </Tooltip>
        )}
      </>
    );
  }
}

export default StopSettings;
