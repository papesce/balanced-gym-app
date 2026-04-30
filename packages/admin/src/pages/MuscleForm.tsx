import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, CircularProgress, Alert,
} from '@mui/material';
import {
  useGetMusclesQuery,
  useCreateMuscleMutation,
  useUpdateMuscleMutation,
} from '../redux/api';

export default function MuscleForm() {
  const { muscleId } = useParams<{ muscleId: string }>();
  const isEdit = !!muscleId;
  const navigate = useNavigate();

  const { data: muscles } = useGetMusclesQuery(undefined, { skip: !isEdit });
  const [createMuscle, { isLoading: isCreating }] = useCreateMuscleMutation();
  const [updateMuscle, { isLoading: isUpdating }] = useUpdateMuscleMutation();

  const [name, setName] = useState('');
  const [muscleURL, setMuscleURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && muscles) {
      const muscle = muscles.find((m) => m._id === muscleId);
      if (muscle) {
        setName(muscle.name);
        setMuscleURL(muscle.muscleURL || '');
      }
    }
  }, [isEdit, muscles, muscleId]);

  async function handleSubmit() {
    setError('');
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      if (isEdit) {
        await updateMuscle({ muscleId: muscleId!, data: { name, muscleURL } }).unwrap();
      } else {
        await createMuscle({ name, muscleURL }).unwrap();
      }
      navigate('/muscles');
    } catch (err: any) {
      setError(err.data?.error || 'Failed to save muscle');
    }
  }

  return (
    <Box p={2} maxWidth={600}>
      <Typography variant="h5" mb={2}>
        {isEdit ? 'Edit Muscle' : 'New Muscle'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth label="Name" margin="normal"
        value={name} onChange={(e) => setName(e.target.value)}
      />

      <Box display="flex" gap={2} alignItems="flex-start">
        <TextField
          fullWidth label="Muscle URL" margin="normal"
          value={muscleURL} onChange={(e) => setMuscleURL(e.target.value)}
        />
        {muscleURL && (
          <Box mt={2}>
            <img alt="muscle preview" style={{ maxHeight: 150 }} src={muscleURL} />
          </Box>
        )}
      </Box>

      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
        >
          {(isCreating || isUpdating) ? <CircularProgress size={24} /> : (isEdit ? 'Update' : 'Create')}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/muscles')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
