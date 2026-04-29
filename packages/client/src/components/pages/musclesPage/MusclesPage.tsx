import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from "@mui/material/IconButton";
// import InfoIcon from "@mui/icons-material/Info";
import { IExercise, IMuscle } from "balanced-gym-model";
import Typography from "@mui/material/Typography";

interface MusclePageProps {
  exercise: IExercise;
  noDataMsg?: string;
}

interface IMuscleWithType extends IMuscle {
  muscleType: string
}

export const getMuscles = (exercise: IExercise) => {
  const muscles: IMuscleWithType[] = [];
  const { target, synergists = [] } = exercise;
  if (target) {
    const tmuscle: IMuscleWithType = { muscleType: "Target", ...target };
    muscles.push(tmuscle);
  }
  synergists.forEach(syn => {
    const smuscle: IMuscleWithType = {
      muscleType: "Synergist",
      ...syn
    };
    muscles.push(smuscle);
  });
  return muscles;
};

const getMuscleURL = (muscle: IMuscle) => {
  return `${import.meta.env.VITE_APP_ASSETS}/${muscle.muscleURL}`;
};

const MusclesPage: React.FC<MusclePageProps> = ({ exercise, noDataMsg }) => {
  const muscles: IMuscleWithType[] = getMuscles(exercise);
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
    <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: "background.paper",
      width: "100%",
    }}>
      <ImageList cols={2} rowHeight={120} sx={{ width: "100%" }}>
        {/* <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
             <ListSubheader component="div">December</ListSubheader>
        </ImageListItem> */}
        {muscles.map(muscle => (
          <ImageListItem key={muscle._id}>
            <img src={getMuscleURL(muscle)} alt={" "} />
            <ImageListItemBar sx={{ background: "rgba(0, 0, 0, 0.2)" }}
              // title={muscle.muscleType || ""}
              // titlePosition="top"
              subtitle={(<div>
              <Box component="span" sx={{
                whiteSpace: "normal",
                color: "rgba(0, 0, 0, 0.9)",
                background: "rgba(255, 255, 255, 0.5)",
              }}>{muscle.name}</Box><div>
              <Box component="span" sx={{
                color: "rgba(0, 0, 0, 0.9)",
                background: "rgba(255, 255, 255, 0.5)",
              }}>({muscle.muscleType || ""})</Box>
              </div></div>)}
              // actionIcon={
              //   <IconButton
              //     aria-label={`info about ${muscle.name}`}
              //     sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MusclesPage;
