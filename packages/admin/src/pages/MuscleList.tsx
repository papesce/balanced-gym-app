import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, CircularProgress, Alert,
  ImageList, ImageListItem, ImageListItemBar, IconButton,
} from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import { useGetMusclesQuery } from '../redux/api';

export default function MuscleList() {
  const navigate = useNavigate();
  const { data: muscles, isLoading, error } = useGetMusclesQuery();

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h5">Muscles</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/muscle/new')}
        >
          New Muscle
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Exercises
        </Button>
        {muscles && (
          <Typography variant="body2" color="text.secondary">
            {muscles.length} muscles
          </Typography>
        )}
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Failed to load muscles</Alert>}

      <ImageList cols={4} gap={8}>
        {(muscles || []).map((muscle) => (
          <ImageListItem key={muscle._id}>
            {muscle.muscleURL && (
              <img
                src={muscle.muscleURL}
                alt={muscle.name}
                loading="lazy"
                style={{ height: 200, objectFit: 'contain' }}
              />
            )}
            <ImageListItemBar
              title={muscle.name}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  onClick={() => navigate(`/muscle/${muscle._id}/edit`)}
                >
                  <Edit />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
