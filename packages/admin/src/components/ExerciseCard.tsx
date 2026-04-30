import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, CardActions,
  Typography, Button, IconButton, Chip, Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IExerciseListItem } from '../redux/api';

interface ExerciseCardProps {
  exercise: IExerciseListItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function daysAgo(dateStr?: string): string {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return `${diff.toFixed(0)}d ago`;
}

function formatMuscles(muscles?: { name: string }[]): string {
  if (!muscles?.length) return '—';
  return muscles.map((m) => m.name).join(', ');
}

export function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  const [showImage, setShowImage] = useState(true);

  return (
    <Card sx={{ width: 280, m: 1 }}>
      {showImage && exercise.gifURL && (
        <CardMedia
          component="img"
          height="180"
          image={exercise.gifURL}
          alt={exercise.name}
        />
      )}
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {exercise.links?.[0] ? (
            <a href={exercise.links[0]} target="_blank" rel="noopener noreferrer">
              {exercise.name}
            </a>
          ) : (
            exercise.name
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Group:</b> {exercise.muscleGroup?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Target:</b> {exercise.target?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Equipment:</b> {exercise.equipment || '—'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Last:</b> {exercise.lastReps ?? 0}r / {exercise.lastWeight ?? 0}kg
        </Typography>
        {exercise.suggestedSerie && (
          <Typography variant="body2" color="text.secondary">
            <b>Suggested:</b> {exercise.suggestedSerie.reps}r /{' '}
            {Math.round(exercise.suggestedSerie.weight * 100) / 100}kg
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          <b>Routine:</b> {exercise.routineId?.name || '—'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Updated:</b> {daysAgo(exercise.lastUpdated)}
        </Typography>
        <Box mt={0.5}>
          <Typography variant="caption" color="text.secondary">
            <b>Syn:</b> {formatMuscles(exercise.synergists)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            <b>Stab:</b> {formatMuscles(exercise.stabilizers)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(exercise._id)}>Edit</Button>
        <Button size="small" color="error" onClick={() => onDelete(exercise._id)}>Delete</Button>
        <IconButton size="small" onClick={() => setShowImage(!showImage)}>
          {showImage ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
