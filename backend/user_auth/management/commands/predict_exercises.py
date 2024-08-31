import pandas as pd
import joblib
from tensorflow.keras.models import load_model

# Load the trained model and preprocessor
model = load_model('exercise_suitability_model.h5')
preprocessor = joblib.load('preprocessor.pkl')

# Load the exercise data
exercise_data = pd.read_excel('exercises.xlsx')

# Define the new user's data
new_user = {
    'Skill': 'Intermediate',
    'Age': 26,
    'Injury': 'Torn ACL',
    'Equipment': 'Resistance Band',
    'BMI': 23
}

# Map skill and difficulty levels to numerical values for comparison
difficulty_mapping = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
}

# Convert user's skill to its corresponding numerical value
user_skill_level = difficulty_mapping[new_user['Skill']]

# Add a Difficulty column to exercise_data using the mapping
exercise_data['Difficulty_Level'] = exercise_data['Difficulty'].map(difficulty_mapping)

# Repeat the user data for each exercise and merge with exercise data
user_df = pd.DataFrame([new_user] * len(exercise_data))
user_exercise_df = pd.concat([user_df, exercise_data[['ID', 'Difficulty_Level']]], axis=1)

# Rename the exercise ID column to match the preprocessor's expected format
user_exercise_df.rename(columns={'ID': 'Exercise ID'}, inplace=True)

# Preprocess the data
X_new_user = preprocessor.transform(user_exercise_df)

# Predict suitability
suitability_scores = model.predict(X_new_user)

# Adjust the suitability score based on difficulty match
bonus = 0.1  # Adjust the bonus value as needed
user_exercise_df['Suitability'] = suitability_scores.flatten()

for i, row in user_exercise_df.iterrows():
    exercise_difficulty = row['Difficulty_Level']
    if exercise_difficulty == user_skill_level:
        user_exercise_df.at[i, 'Suitability'] += bonus
    elif exercise_difficulty < user_skill_level:
        user_exercise_df.at[i, 'Suitability'] += bonus / 2  # Half the bonus for easier exercises

# Sort exercises by suitability score in descending order and select the top 12
top_exercises = user_exercise_df.sort_values(by='Suitability', ascending=False).head(12)

# Define number of workouts per week (hardcoded for now)
workouts_per_week = 3

# Calculate the number of exercises per workout
exercises_per_workout = len(top_exercises) // workouts_per_week

# Create a weekly fitness plan
weekly_plan = {}

for i in range(workouts_per_week):
    weekly_plan[f'Workout {i+1}'] = top_exercises.iloc[i * exercises_per_workout:(i + 1) * exercises_per_workout]

# Cross-reference the exercise IDs with the original exercise data to get detailed info
for workout, exercises in weekly_plan.items():
    print(f"\n{workout}:")
    for index, exercise in exercises.iterrows():
        exercise_id = exercise['Exercise ID']
        # Retrieve the exercise details from the original exercise_data
        exercise_info = exercise_data[exercise_data['ID'] == exercise_id].iloc[0]
        print(f"- {exercise_info['Name']} ({exercise_info['Muscle Group']}) {exercise_info['Type']} {exercise_info['Equipment']}")

# Optional: Save the weekly fitness plan to an Excel file
weekly_plan_df = pd.DataFrame(dict([(k, v['Exercise ID']) for k, v in weekly_plan.items()]))
weekly_plan_df.to_excel('weekly_fitness_plan.xlsx', index=False)