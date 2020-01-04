import React from "react";
import { IExercise } from "../../model/ExerciseModel";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface DetailsPageProps {
  exercise: IExercise;
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
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
}));

const DetailsPage: React.FC<DetailsPageProps> = ({ exercise }) => {
  const classes = useStyles();
  const {
    suggestedSerie = { reps: 0, weight: 0 },
    gifURL,
    equipment = "none"
    // synergists = [],
    // stabilizers = []
  } = exercise;
  const imageURL: string = `${process.env.REACT_APP_SERVER}/${gifURL}`;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={imageURL}
        title="Paella dish"
      />
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
};

export default DetailsPage;
