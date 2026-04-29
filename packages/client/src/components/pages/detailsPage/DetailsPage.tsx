import React, { useState } from "react";
import { IExercise } from "balanced-gym-model";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import Tooltip from "@material-ui/core/Tooltip";
import "./DetailsPage.css";

interface DetailsPageProps {
  exercise: IExercise;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ exercise }) => {
  const [flip, setFlip] = useState(true);

  const handleFlipClick = () => {
    setFlip(prev => !prev);
  };

  const {
    suggestedSerie = { reps: 0, weight: 0 },
    gifURL,
    equipment = "none"
  } = exercise;
  const imageURL: string = `${import.meta.env.VITE_APP_ASSETS}/${gifURL}`;
  const detailsPageImg: string = flip ? 'details-page-img' : 'details-page-img-hor';
  return (
    <Card className={'details-page-card'}>
      <Tooltip title="Flip Horizontal">
        <IconButton
          className={"details-page-icon-button"}
          size="medium"
          onClick={handleFlipClick}
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
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailsPage;
