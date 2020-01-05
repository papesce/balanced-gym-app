import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
import { IExercise } from "../../model/ExerciseModel";
import { ITarget } from "../../model/TargetModel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    maxWidth: 345
  },
  gridList: {
    width: 345,
    // height: 350
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  gridTileBar: {
    background: "rgba(0, 0, 0, 0.2)"
  },
  tileBarSubtitle: {
    whiteSpace: "normal",
    color: "rgba(0, 0, 0, 0.9)",
    background: "rgba(255, 255, 255, 0.5)"
  },
  tileBarTitle: {
    color: "rgba(0, 0, 0, 0.9)",
    background: "rgba(255, 255, 255, 0.5)"
  }
}));

interface MusclePageProps {
  exercise: IExercise;
  noDataMsg?: string;
}

export const getMuscles = (exercise: IExercise) => {
  const muscles: ITarget[] = [];
  const { target, synergists = [] } = exercise;
  if (target) {
    const tmuscle: ITarget = { muscleType: "Target", ...target };
    muscles.push(tmuscle);
  }
  synergists.forEach(syn => {
    const smuscle: ITarget = {
      muscleType: "Synergist",
      ...syn
    };
    muscles.push(smuscle);
  });
  return muscles;
};

const getMuscleURL = (muscle: ITarget) => {
  return `${process.env.REACT_APP_SERVER}/${muscle.muscleURL}`;
};

const MusclesPage: React.FC<MusclePageProps> = ({ exercise, noDataMsg }) => {
  const classes = useStyles();
  const muscles: ITarget[] = getMuscles(exercise);
  if (muscles.length === 0) {
    return (
      <Typography
        className="elem-list"
        variant="caption"
        display="block"
        gutterBottom
      >
        {noDataMsg || "No muscle data available"}
      </Typography>
    );
  }
  return (
    <div className={classes.root}>
      <GridList cols={3} cellHeight={120} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
             <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {muscles.map(muscle => (
          <GridListTile key={muscle._id}>
            <img src={getMuscleURL(muscle)} alt={" "} />
            <GridListTileBar className={classes.gridTileBar}
              // title={muscle.muscleType || ""}
              // titlePosition="top"
              subtitle={(<div>
              <span className={classes.tileBarSubtitle}>{muscle.name}</span><div>
              <span className={classes.tileBarTitle}>({muscle.muscleType || ""})</span>
              </div></div>)}
              // actionIcon={
              //   <IconButton
              //     aria-label={`info about ${muscle.name}`}
              //     className={classes.icon}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MusclesPage;
