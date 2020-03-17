// import ...from '';
import SaveIcon from "@material-ui/icons/Save";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import image from "../../assets/images/Ball-0.8s-200px.gif";

const isSaving = (
  <img src={image} style={{ width: "33px" }} title="loading story" />
);

const ControllMenu = props => {
  return (
    <div className="controll-menu">
      <h1 className="title">Write Your Story ... </h1>
      <div className="status-box">
        {props.isLoading ? (
          <span>{isSaving}</span>
        ) : (
          <Tooltip title="Saved Story" placement="top">
            <DoneIcon style={{ cursor: "none" }} />
          </Tooltip>
        )}
      </div>
      <Tooltip title="Save Story" placement="top">
        <SaveIcon
          onClick={props.save}
          style={{ color: "green", cursor: "pointer" }}
          fontSize="large"
        />
      </Tooltip>
    </div>
  );
};

export default ControllMenu;
