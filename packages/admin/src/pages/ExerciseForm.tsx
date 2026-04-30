import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, Autocomplete, Chip, CircularProgress, Alert,
} from '@mui/material';
import {
  useGetMusclesQuery,
  useGetMuscleGroupsQuery,
  useGetRoutinesQuery,
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  IExerciseCreate,
} from '../redux/api';
import { EQUIPMENTS } from '../components/Equipments';

export default function ExerciseForm() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const isEdit = !!exerciseId;
  const navigate = useNavigate();

  const { data: muscles } = useGetMusclesQuery();
  const { data: muscleGroups } = useGetMuscleGroupsQuery();
  const { data: routines } = useGetRoutinesQuery();
  const { data: allExercises } = useGetExercisesQuery(undefined, { skip: !isEdit });

  const [createExercise, { isLoading: isCreating }] = useCreateExerciseMutation();
  const [updateExercise, { isLoading: isUpdating }] = useUpdateExerciseMutation();

  const [name, setName] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [routineId, setRoutineId] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [target, setTarget] = useState('');
  const [gifURL, setGifURL] = useState('');
  const [exerciseURL, setExerciseURL] = useState('');
  const [equipment, setEquipment] = useState('');
  const [synergists, setSynergists] = useState<{ _id: string; name: string }[]>([]);
  const [stabilizers, setStabilizers] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && allExercises) {
      const ex = allExercises.find((e) => e._id === exerciseId);
      if (ex) {
        setName(ex.name || '');
        setExternalLink(ex.links?.[0] || '');
        setRoutineId(ex.routineId?._id || '');
        setMuscleGroup(ex.muscleGroup?._id || '');
        setTarget(ex.target?._id || '');
        setGifURL(ex.gifURL || '');
        setExerciseURL(ex.exerciseURL || '');
        setEquipment(ex.equipment || '');
        setSynergists(ex.synergists || []);
        setStabilizers(ex.stabilizers || []);
      }
    }
  }, [isEdit, allExercises, exerciseId]);

  const muscleOptions = muscles?.map((m) => ({ _id: m._id, name: m.name })) || [];

  async function handleSubmit() {
    setError('');
    if (!name || !gifURL) {
      setError('Name and GIF URL are required');
      return;
    }
    if (!routineId) {
      setError('Routine is required');
      return;
    }

    const data: IExerciseCreate = {
      name,
      muscleGroup: muscleGroup || undefined,
      target: target || undefined,
      gifURL,
      exerciseURL: exerciseURL || undefined,
      equipment: equipment || undefined,
      synergists: synergists.map((s) => s._id),
      stabilizers: stabilizers.map((s) => s._id),
      routineId,
      links: externalLink ? [externalLink] : [],
    };

    try {
      if (isEdit) {
        await updateExercise({ exerciseId: exerciseId!, data }).unwrap();
      } else {
        await createExercise({ routineId, data }).unwrap();
      }
      navigate('/');
    } catch (err: any) {
      setError(err.data?.error || 'Failed to save exercise');
    }
  }

  return (
    <Box p={2} maxWidth={800}>
      <Typography variant="h5" mb={2}>
        {isEdit ? 'Edit Exercise' : 'New Exercise'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth label="Name" margin="normal"
        value={name} onChange={(e) => setName(e.target.value)}
      />

      <TextField
        fullWidth label="External Link" margin="normal"
        value={externalLink} onChange={(e) => setExternalLink(e.target.value)}
      />

      <Box display="flex" gap={2} mt={1}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Routine</InputLabel>
          <Select value={routineId} label="Routine" onChange={(e) => setRoutineId(e.target.value)}>
            {routines?.map((r) => (
              <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Muscle Group</InputLabel>
          <Select value={muscleGroup} label="Muscle Group" onChange={(e) => setMuscleGroup(e.target.value)}>
            {muscleGroups?.map((mg) => (
              <MenuItem key={mg._id} value={mg._id}>{mg.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={2} alignItems="flex-start" mt={1}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Target Muscle</InputLabel>
          <Select value={target} label="Target Muscle" onChange={(e) => setTarget(e.target.value)}>
            {muscleOptions.map((m) => (
              <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {target && muscles && (
          <Box mt={2}>
            <img
              alt="target muscle"
              style={{ maxHeight: 120 }}
              src={muscles.find((m) => m._id === target)?.muscleURL}
            />
          </Box>
        )}
      </Box>

      <Box display="flex" gap={2} alignItems="flex-start" mt={1}>
        <TextField
          fullWidth label="GIF URL" margin="normal"
          value={gifURL} onChange={(e) => setGifURL(e.target.value)}
        />
        {gifURL && (
          <Box mt={2}>
            <img alt="exercise gif" style={{ width: 150 }} src={gifURL} />
          </Box>
        )}
      </Box>

      <Box display="flex" gap={2} alignItems="flex-start" mt={1}>
        <TextField
          fullWidth label="Exercise URL" margin="normal"
          value={exerciseURL} onChange={(e) => setExerciseURL(e.target.value)}
        />
        {exerciseURL && (
          <Box mt={2}>
            <img alt="exercise ref" style={{ maxWidth: 200 }} src={exerciseURL} />
          </Box>
        )}
      </Box>

      <Autocomplete
        multiple
        options={muscleOptions}
        getOptionLabel={(o) => o.name}
        value={synergists}
        onChange={(_, val) => setSynergists(val)}
        isOptionEqualToValue={(o, v) => o._id === v._id}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option.name} {...getTagProps({ index })} key={option._id} size="small" />
          ))
        }
        renderInput={(params) => <TextField {...params} label="Synergists" margin="normal" />}
      />

      <Autocomplete
        multiple
        options={muscleOptions}
        getOptionLabel={(o) => o.name}
        value={stabilizers}
        onChange={(_, val) => setStabilizers(val)}
        isOptionEqualToValue={(o, v) => o._id === v._id}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option.name} {...getTagProps({ index })} key={option._id} size="small" />
          ))
        }
        renderInput={(params) => <TextField {...params} label="Stabilizers" margin="normal" />}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Equipment</InputLabel>
        <Select value={equipment} label="Equipment" onChange={(e) => setEquipment(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          {EQUIPMENTS.map((eq) => (
            <MenuItem key={eq.value} value={eq.value}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
        >
          {(isCreating || isUpdating) ? <CircularProgress size={24} /> : (isEdit ? 'Update' : 'Create')}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
