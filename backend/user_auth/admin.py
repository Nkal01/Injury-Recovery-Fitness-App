from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Exercise, WorkoutPlan
import json

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'sex', 'age', 'height', 'weight', 'bmi', 'fitness_level', 'injuries', 'preferred_workout_times', 'available_equipment', 'has_plan', 'plan_week')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ['username', 'email', 'sex', 'age', 'height', 'weight', 'bmi', 'fitness_level', 'injuries', 'preferred_workout_times', 'available_equipment', 'has_plan', 'plan_week']

class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'age', 'injury', 'muscle_group', 'type', 'equipment', 'description', 'bmi', 'week1', 'week2', 'week3']
    search_fields = ['name', 'difficulty', 'injury', 'muscle_group', 'type']
    list_filter = ['difficulty', 'type', 'equipment']

class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_plan_data_summary')
    search_fields = ('user__username',)

    def get_plan_data_summary(self, obj):
        # Show a summary of the plan data
        return json.dumps(obj.plan_data, indent=2)[:100] + '...'  # Truncate for display

    get_plan_data_summary.short_description = 'Plan Data'

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(WorkoutPlan, WorkoutPlanAdmin)