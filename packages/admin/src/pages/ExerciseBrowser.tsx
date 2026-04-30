import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Button, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import {
  useGetExercisesQuery,
  useGetMuscleGroupsQuery,
  useGetMusclesQuery,
  useDeleteExerciseMutation,
} from '../redux/api';
import { ExerciseCard } from '../components/ExerciseCard';

export default function ExerciseBrowser() {
  const navigate = useNavigate();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const queryParams: Record<string, string> = {};
  if (selectedMuscleGroup) queryParams.muscleGroup = selectedMuscleGroup;
  if (selectedTarget) queryParams.target = selectedTarget;

  const { data: exercises, isLoading, error } = useGetExercisesQuery(queryParams);
  const { data: muscleGroups } = useGetMuscleGroupsQuery();
  const { data: muscles } = useGetMusclesQuery();
  const [deleteExercise] = useDeleteExerciseMutation();

  const availableTargets = useMemo(() => {
    if (!exercises) return [];
    const seen = new Map<string, string>();
    exercises.forEach((ex) => {
      if (ex.target?._id && !seen.has(ex.target._id)) {
        seen.set(ex.target._id, ex.target.name);
      }
    });
    return Array.from(seen.entries())
      .map(([id, name]) => ({ _id: id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [exercises]);

  function handleDelete(id: string) {
    setDeleteId(id);
  }

  async function confirmDelete() {
    if (deleteId) {
      await deleteExercise(deleteId);
      setDeleteId(null);
    }
  }

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
        <Typography variant="h5">Exercises</Typography>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Muscle Group</InputLabel>
          <Select
            value={selectedMuscleGroup}
            label="Muscle Group"
            onChange={(e) => {
              setSelectedMuscleGroup(e.target.value);
              setSelectedTarget('');
            }}
          >
            <MenuItem value="">All</MenuItem>
            {muscleGroups?.map((mg) => (
              <MenuItem key={mg._id} value={mg._id}>{mg.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Target</InputLabel>
          <Select
            value={selectedTarget}
            label="Target"
            onChange={(e) => setSelectedTarget(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {availableTargets.map((t) => (
              <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/exercise/new')}
        >
          New Exercise
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/muscles')}
        >
          Muscles
        </Button>

        {exercises && (
          <Typography variant="body2" color="text.secondary">
            {exercises.length} exercises
          </Typography>
        )}
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Failed to load exercises</Alert>}

      <Box display="flex" flexWrap="wrap">
        {exercises?.map((ex) => (
          <ExerciseCard
            key={ex._id}
            exercise={ex}
            onEdit={(id) => navigate(`/exercise/${id}/edit`)}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete this exercise and all its series data. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
