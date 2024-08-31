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
import json

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        # Create a new user using the CustomUser model
        user = CustomUser.objects.create_user(username=username, password=password, email=email, has_plan=False)
        return Response(CustomUserSerializer(user).data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        # Authenticate using the CustomUser model
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user = user)
            user_data = CustomUserSerializer(user).data
            return Response({
                "token": token.key,
                "user": user_data
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserInfoView(APIView):
    def post(self, request):
        username = request.data.get('username')
        sex = request.data.get('sex')
        age = request.data.get('age')
        height = request.data.get('height')
        weight = request.data.get('weight')
        fitness_level = request.data.get('fitnessLevel')
        injuries = request.data.get('injuries')
        preferred_workout_times = request.data.get('preferredWorkoutTimes')
        available_equipment = request.data.get('availableEquipment')
        has_plan = request.data.get('hasPlan')

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

        plan = generate_plan(user_data)
        print(plan)
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
        
        if muscle_groups:
            # Check for non-empty muscle groups
            if muscle_groups[0]:  # Avoid filtering with an empty string
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
            print(plan_data)
            return JsonResponse({'plan': plan_data})
        else:
            return JsonResponse({'error': 'Workout plan not found'}, status=404)
    