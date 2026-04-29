import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
  const imageURL: string = `${import.meta.env.VITE_APP_ASSETS}/${image}`;
  // console.log(imageURL)
  return (
    <Card sx={{ minWidth: 340, maxWidth: 340, display: "flex" }}>
      <CardMedia
        sx={{ height: 100, width: 100 }}
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
