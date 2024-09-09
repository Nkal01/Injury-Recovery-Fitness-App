from rest_framework import serializers
from .models import CustomUser, Exercise, WorkoutPlan

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'sex', 'age', 'height', 'weight', 'bmi', 'fitness_level', 'injuries', 'preferred_workout_times', 'available_equipment', 'has_plan', 'plan_week', 'completed_days')

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = '__all__'