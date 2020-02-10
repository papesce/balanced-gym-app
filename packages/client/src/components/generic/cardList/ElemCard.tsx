import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 340,
    maxWidth: 340,
    display: "flex"
  },
  media: {
    height: 100,
    width: 100
  }
});

interface ElemCardProps {
  primary: string;
  secondary1: any;
  secondary2: any;
  secondary3?: any;
  image: string;
}

const ElemCard: React.FC<ElemCardProps> = ({
  primary = "",
  secondary1 = "",
  secondary2 = "",
  secondary3 = "",
  image = ""
}) => {
  const classes = useStyles();
  const imageURL: string = `${process.env.REACT_APP_ASSETS}/${image}`;
  // console.log(imageURL)
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={imageURL}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography component="h6" variant="subtitle1">
          {primary}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          <div>{secondary1}</div>
          <div>{secondary2}</div>
          <div>{secondary3}</div>
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default ElemCard;
