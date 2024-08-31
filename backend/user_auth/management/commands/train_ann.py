import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import joblib

# Load the dataset
data = pd.read_excel('exercise_suitability.xlsx')

# Define the features and target
X = data.drop(columns=['Suitable'])
y = data['Suitable']

# Preprocessing pipeline
categorical_features = ['Skill', 'Injury', 'Equipment', 'Exercise ID']
numerical_features = ['Age', 'BMI']

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='constant', fill_value='None')),
            ('onehot', OneHotEncoder())
        ]), categorical_features),
        ('num', StandardScaler(), numerical_features)
    ]
)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocess the data
X_train = preprocessor.fit_transform(X_train)
X_test = preprocessor.transform(X_test)

cat_transformer = preprocessor.named_transformers_['cat']
onehot_encoder = cat_transformer.named_steps['onehot']
for feature_name, categories in zip(categorical_features, onehot_encoder.categories_):
    print(f"Categories for {feature_name}: {categories}")


# Build the ANN model
model = Sequential([
    Dense(128, input_shape=(X_train.shape[1],), activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(X_train, y_train, epochs=50, validation_data=(X_test, y_test))

# Save the model
model.save('exercise_suitability_model.h5')

# Optional: Save the preprocessor if needed later
import joblib
joblib.dump(preprocessor, 'preprocessor.pkl')