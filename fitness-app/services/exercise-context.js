import React, { createContext, useState } from 'react';

const ExerciseContext = createContext();

const ExerciseProvider = ({ children }) => {
  const [exerciseType, setExerciseType] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

  return (
    <ExerciseContext.Provider value={{ exerciseType, setExerciseType, muscleGroup, setMuscleGroup }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseProvider };