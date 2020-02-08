import React, { Component } from "react";
import { IExercise } from "balanced-gym-model";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import "./DetailsPage.css";

interface DetailsPageProps {
  exercise: IExercise;
  classes: any;
}

interface DetailsPageState {
  flip: boolean;
}

const styles = (theme: any) => ({
  media: {
    // height: 0
    // paddingTop: "56.25%" // 16:9
    height: "250px",
    margin: "8px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  }
});

class DetailsPage extends Component<DetailsPageProps, DetailsPageState> {
  state = { flip: true };
  handleFlipClick = () => {
    this.setState((prev: DetailsPageState) => ({ flip: !prev.flip }));
  };
  render() {
    // const classes = useStyles();
    const { exercise } = this.props;
    const {
      suggestedSerie = { reps: 0, weight: 0 },
      gifURL,
      equipment = "none"
      // synergists = [],
      // stabilizers = []
    } = exercise;
    const imageURL: string = `${process.env.REACT_APP_ASSETS}/${gifURL}`;
    const { flip } = this.state;
    const detailsPageImg: string = flip ? 'details-page-img' : 'details-page-img-hor';
    return (
      <Card className={'details-page-card'}>
        <Tooltip title="Flip Horizontal">
          <IconButton
            className={"details-page-icon-button"}
            size="medium"
            onClick={this.handleFlipClick}
          >
            <FlipToBackIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <CardMedia className={detailsPageImg} image={imageURL} title="" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <div>Equipment: {equipment}</div>
            <div>
              Suggested Serie: (r: {suggestedSerie.reps}, w:{" "}
              {suggestedSerie.weight})
            </div>
            {/* <div>Syn Count: {synergists.length}</div>
          <div>Stab Count: {stabilizers.length}</div> */}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailsPage);
