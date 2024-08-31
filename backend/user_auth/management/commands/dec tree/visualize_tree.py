import joblib
import matplotlib.pyplot as plt
from sklearn import tree
import pandas as pd

# Load the model from the file
model = joblib.load('decision_tree_model.pkl')

# Load the original data to extract feature names
exercise_data = pd.read_csv('exercises.csv')

# Recreate the feature names using the original data
X = exercise_data[['Difficulty', 'Age', 'Injury', 'Muscle Group', 'Type', 'Equipment']]
X = pd.get_dummies(X)  # Apply the same encoding as in train_model.py

# Plot the tree
plt.figure(figsize=(20, 10))  # Adjust the figure size as needed
tree.plot_tree(model, filled=True, feature_names=X.columns, class_names=['Not Suitable', 'Suitable'], rounded=True)
plt.show()
