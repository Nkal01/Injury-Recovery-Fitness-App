from django.contrib.auth import authenticate
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser, Exercise, WorkoutPlan
from .serializers import CustomUserSerializer, ExerciseSerializer
from rest_framework.authtoken.models import Token
from .workout_plan import generate_plan
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import json

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        user = CustomUser.objects.create_user(username=username, password=password, email=email, has_plan=False)
        return Response(CustomUserSerializer(user).data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        identifier = request.data.get('username')
        password = request.data.get('password')

        try:
            validate_email(identifier)
            user = CustomUser.objects.filter(email=identifier).first()
            if user:
                username = user.username
            else:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError:
            username = identifier

        user = authenticate(username=username, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            user_data = CustomUserSerializer(user).data
            return Response({
                "token": token.key,
                "user": user_data
            })
        
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

#views.py
class UserInfoView(APIView):
    def post(self, request):
        username = request.data.get('username')
        sex = request.data.get('sex')
        age = request.data.get('age')
        height = request.data.get('height')
        weight = request.data.get('weight')
        fitness_level = request.data.get('fitness_level')
        injuries = request.data.get('injuries')
        preferred_workout_times = request.data.get('preferred_workout_times')
        available_equipment = request.data.get('available_equipment')
        has_plan = request.data.get('hasPlan')
        plan_week = request.data.get('planWeek')

        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.sex = sex
        user.age = age
        user.height = float(height) if height else None
        user.weight = float(weight) if weight else None
        user.fitness_level = fitness_level
        user.injuries = injuries
        user.preferred_workout_times = preferred_workout_times
        user.available_equipment = available_equipment
        user.has_plan = has_plan
        user.plan_week = plan_week
        user.save()

        user_data = {
            'username': username,
            'fitnessLevel': fitness_level,
            'age': age,
            'injuries': injuries,
            'availableEquipment': available_equipment,
            'height': float(height),
            'weight': float(weight),
            'preferredWorkoutTimes': preferred_workout_times,
        }

        print(user_data)
        plan = generate_plan(user_data)
        return Response({"message": "User profile updated and plan generated successfully", "plan": plan}, status=status.HTTP_200_OK)

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        exercise_type = self.request.query_params.get('type')
        muscle_groups = self.request.query_params.get('muscle_group', '').split(',')

        if exercise_type:
            queryset = queryset.filter(type=exercise_type)
        
        if muscle_groups and muscle_groups[0]:
            q_objects = Q()
            for group in muscle_groups:
                q_objects |= Q(muscle_group__icontains=group)
            queryset = queryset.filter(q_objects)
        
        return queryset
    
class WorkoutPlanView(APIView):
    def get(self, request, username):
        user = get_object_or_404(CustomUser, username=username)
        workout_plan = WorkoutPlan.objects.filter(user=user).first()
        if workout_plan:
            plan_data = workout_plan.plan_data
            completed_days = user.completed_days
            return JsonResponse({
                'plan': plan_data,
                'completed_days': completed_days
            })
        else:
            return JsonResponse({'error': 'Workout plan not found'}, status=404)

    def post(self, request, username):

        user = get_object_or_404(CustomUser, username=username)
        completed_days = request.data.get('completed_days')

        if len(completed_days) != len(user.completed_days):
            return Response({'error': 'Mismatch between provided and stored number of workout days.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's completed days
        user.completed_days = completed_days
        user.save()

        return JsonResponse({
            'message': 'Completed days updated successfully.',
            'completed_days': user.completed_days
        }, status=status.HTTP_200_OK)
    
class UpdatePlanView(APIView):
    def put(self, request):
        username = request.data.get('username')
        age = request.data.get('age')
        height = request.data.get('height')
        weight = request.data.get('weight')
        fitness_level = request.data.get('fitness_level')
        injuries = request.data.get('injuries')
        preferred_workout_times = request.data.get('preferred_workout_times')
        available_equipment = request.data.get('available_equipment')
        plan_week = request.data.get('planWeek')
        completed_days = request.data.get('completedDays')

        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        WorkoutPlan.objects.filter(user=user).delete()

        user.fitness_level = fitness_level
        user.preferred_workout_times = preferred_workout_times
        user.plan_week = plan_week
        user.completed_days = completed_days
        user.save()

        user_data = {
            'username': username,
            'fitnessLevel': fitness_level,
            'age': age,
            'injuries': injuries,
            'availableEquipment': available_equipment,
            'height': float(height),
            'weight': float(weight),
            'preferredWorkoutTimes': preferred_workout_times,
        }

        print(user_data)
        plan = generate_plan(user_data)
        return Response({"message": "User profile updated and plan generated successfully", "plan": plan}, status=status.HTTP_200_OK)

class ChangeUsernameView(APIView):
    def put(self, request):
        currentUsername = request.data.get('current_username')
        newUsername = request.data.get('new_username')
        password = request.data.get('password')

        user = authenticate(username=currentUsername, password=password)
        
        if user:
            user.username = newUsername
            user.save()
            return Response({'success': 'Username changed successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    def put(self, request):
        username = request.data.get('username')
        currentPassword = request.data.get('current_password')
        newPassword = request.data.get('new_password')

        user = authenticate(username=username, password=currentPassword)
        
        if user:
            user.set_password(newPassword)
            user.save()
            return Response({'success': 'Username changed successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteAccountView(APIView):
    def delete(self, request):
        username = request.data.get('username')

        user = CustomUser.objects.get(username=username)
        if user:
            user.delete()
            return Response({"detail": "Account successfully deleted."}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

