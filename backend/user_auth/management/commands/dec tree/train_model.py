import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib

# Load the exercise data from the CSV file
exercise_data = pd.read_csv('exercises.csv')

# Function to generate a suitability label based on user characteristics
def generate_label(row, user_fitness_level, user_injury, user_equipment):
    # Check if the exercise matches the user's injury
    if user_injury not in row['Injury']:
        return 0
    
    # Check if the exercise matches the user's fitness level
    if user_fitness_level == 'Beginner' and row['Difficulty'] != 'Beginner':
        return 0
    if user_fitness_level == 'Intermediate' and row['Difficulty'] not in ['Beginner', 'Intermediate']:
        return 0
    # If the user is Advanced, they can do any level of exercise, so no need to check Difficulty

    # Check if the exercise matches the user's available equipment
    if user_equipment == 'None' and row['Equipment'] != 'nan':
        return 0
    if user_equipment == 'Resistance Band' and row['Equipment'] not in ['nan', 'Resistance Band']:
        return 0
    # If the user has Gym equipment, they can do any exercise, so no need to check Equipment

    # If all conditions are met, the exercise is suitable
    return 1

# Example user characteristics (these would typically come from your Django database)
user_fitness_level = 'Intermediate'  # Replace with actual user data
user_injury = 'Torn ACL'  # Replace with actual user data
user_equipment = 'Resistance Band'  # Replace with actual user data

# Apply the label generator function to each exercise in the dataset
exercise_data['suitable'] = exercise_data.apply(
    lambda row: generate_label(row, user_fitness_level, user_injury, user_equipment),
    axis=1
)

# Selecting relevant features
X = exercise_data[['Difficulty', 'Age', 'Injury', 'Muscle Group', 'Type', 'Equipment']]
y = exercise_data['suitable']

# Encode categorical variables into dummy/indicator variables
X = pd.get_dummies(X)

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Decision Tree model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(model, 'decision_tree_model.pkl')

print("Model training complete and saved to decision_tree_model.pkl")
