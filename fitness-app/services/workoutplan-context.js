import React, { createContext, useState, useContext } from 'react';

const WorkoutPlanContext = createContext();

export const WorkoutPlanProvider = ({ children }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);

  return (
    <WorkoutPlanContext.Provider value={{ workoutPlan, setWorkoutPlan }}>
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export const useWorkoutPlan = () => useContext(WorkoutPlanContext);