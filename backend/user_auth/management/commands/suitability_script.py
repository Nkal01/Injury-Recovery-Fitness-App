import pandas as pd

# Read the Excel files
exercises_df = pd.read_excel('exercises.xlsx')
users_df = pd.read_excel('user_examples.xlsx')

# Function to check if a user's attribute matches the exercise's requirement
def is_suitable(user, exercise):
    # Check Injury
    if user['Injury'] not in exercise['Injury']:
        return False

    # Check Difficulty with Skill
    skill_mapping = {'Beginner': 0, 'Intermediate': 1, 'Advanced': 2}
    if skill_mapping[user['Skill']] < skill_mapping[exercise['Difficulty']]:
        return False

    # Check Age
    if exercise['Age'] != 'All':
        age_limit = int(exercise['Age'].replace('Under ', ''))
        if user['Age'] >= age_limit:
            return False

    # Check Equipment
    if not pd.isna(exercise['Equipment']) and user['Equipment'] != exercise['Equipment']:
        return False

    # Check BMI
    if exercise['BMI Range'] != 'All':
        bmi_limit = int(exercise['BMI Range'].replace('< ', ''))
        if user['BMI'] >= bmi_limit:
            return False

    return True

# Create the new table
data = []

for _, user in users_df.iterrows():
    for _, exercise in exercises_df.iterrows():
        suitable = 1 if is_suitable(user, exercise) else 0
        data.append({
            'User ID': user['User ID'],
            'Skill': user['Skill'],
            'Age': user['Age'],
            'Injury': user['Injury'],
            'Equipment': user['Equipment'],
            'BMI': user['BMI'],
            'Exercise ID': exercise['ID'],
            'Suitable': suitable
        })

# Convert the data to a DataFrame
suitability_df = pd.DataFrame(data)

# Save the new table to an Excel file
suitability_df.to_excel('exercise_suitability.xlsx', index=False)

print('exercise_suitability.xlsx has been created successfully!')
