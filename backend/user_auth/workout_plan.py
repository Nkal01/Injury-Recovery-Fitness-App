import joblib
import pandas as pd
from tensorflow.keras.models import load_model
from .models import CustomUser, WorkoutPlan

# Load model and preprocessor
model = load_model(r'C:\Users\Nkal0\OneDrive\Documents\fProject\backend\user_auth\management\commands\exercise_suitability_model.h5')
preprocessor = joblib.load(r'C:\Users\Nkal0\OneDrive\Documents\fProject\backend\user_auth\management\commands\preprocessor.pkl')

def generate_plan(user_data):
    # Load exercise data
    exercise_data = pd.read_excel(r'C:\Users\Nkal0\OneDrive\Documents\fProject\backend\user_auth\management\commands\exercises.xlsx')

    # Convert user data to appropriate format for prediction
    new_user = {
        'Skill': user_data['fitnessLevel'],
        'Age': user_data['age'],
        'Injury': user_data['injuries'],
        'Equipment': user_data['availableEquipment'],
        'BMI': user_data['weight'] / (user_data['height'] / 100) ** 2
    }

    # Map fitness level to numerical values for prediction
    difficulty_mapping = {'Beginner': 1, 'Intermediate': 2, 'Advanced': 3}
    user_skill_level = difficulty_mapping.get(new_user['Skill'], 0)

    # Add a Difficulty column to exercise_data
    exercise_data['Difficulty_Level'] = exercise_data['Difficulty'].map(difficulty_mapping)

    # Prepare user_exercise_df
    selected_columns = ['ID', 'Name', 'Difficulty_Level']
    user_df = pd.DataFrame([new_user] * len(exercise_data))
    user_exercise_df = pd.concat([user_df, exercise_data[selected_columns]], axis=1)
    user_exercise_df.rename(columns={'ID': 'Exercise ID'}, inplace=True)

    # Preprocess the data
    X_new_user = preprocessor.transform(user_exercise_df)

    # Predict suitability
    suitability_scores = model.predict(X_new_user)

    # Adjust the suitability score based on difficulty match
    bonus = 0.1
    user_exercise_df['Suitability'] = suitability_scores.flatten()
    for i, row in user_exercise_df.iterrows():
        exercise_difficulty = row['Difficulty_Level']
        if exercise_difficulty == user_skill_level:
            user_exercise_df.at[i, 'Suitability'] += bonus
        elif (user_skill_level - exercise_difficulty) == 1:
            user_exercise_df.at[i, 'Suitability'] += bonus / 2
        elif (user_skill_level - exercise_difficulty) == 2:
            user_exercise_df.at[i, 'Suitability'] += bonus / 3

    # Define the suitability threshold
    suitability_threshold = 0.5  # Adjust this threshold based on your needs

    # Filter exercises based on the threshold
    valid_exercises = user_exercise_df[user_exercise_df['Suitability'] >= suitability_threshold]
    valid_exercises = valid_exercises.sort_values(by='Suitability', ascending=False)

    print(valid_exercises)

    # Calculate the total number of exercises needed
    total_exercises_needed = 4 * int(user_data['preferredWorkoutTimes'])

    # If not enough valid exercises, duplicate some to meet the requirement
    if len(valid_exercises) < total_exercises_needed:
        repetitions_needed = total_exercises_needed - len(valid_exercises)
        valid_exercises = valid_exercises._append([valid_exercises] * (repetitions_needed // len(valid_exercises) + 1), ignore_index=True)
        valid_exercises = valid_exercises.head(total_exercises_needed)

    # Format the plan for response
    weekly_plan = {}
    exercises_per_day = 4  # Number of exercises per day
    num_days = total_exercises_needed // exercises_per_day  # Calculate the number of days needed

    for i in range(num_days):
        start_index = i * exercises_per_day
        end_index = start_index + exercises_per_day
        workout_exercises = valid_exercises.iloc[start_index:end_index]['Name'].tolist()
        weekly_plan[f'Day {i + 1}'] = workout_exercises

    # Save the workout plan
    user = CustomUser.objects.get(username=user_data['username'])
    workout_plan = WorkoutPlan(user=user, plan_data=weekly_plan)
    workout_plan.save()

    return weekly_plan
