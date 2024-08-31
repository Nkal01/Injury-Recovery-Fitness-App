from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import FileExtensionValidator
import json

class CustomUser(AbstractUser):
    SEX_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    
    FITNESS_LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    INJURY_CHOICES = [
        ('Torn Achilles', 'Torn Achilles'),
        ('Torn ACL', 'Torn ACL'),
        ('Torn Meniscus', 'Torn Meniscus'),
    ]

    WORKOUT_TIMES_CHOICES = [
        ('2', '2 times a week'),
        ('3', '3 times a week'),
        ('4', '4 times a week'),
    ]

    EQUIPMENT_CHOICES = [
        ('None', 'None'),
        ('Resistance Band', 'Resistance Band'),
        ('Gym', 'Gym'),
    ]

    sex = models.CharField(max_length=10, choices=SEX_CHOICES, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    bmi = models.FloatField(null=True, blank=True)
    fitness_level = models.CharField(max_length=20, choices=FITNESS_LEVEL_CHOICES, null=True, blank=True)
    injuries = models.CharField(max_length=20, choices=INJURY_CHOICES, null=True, blank=True)
    preferred_workout_times = models.CharField(max_length=1, choices=WORKOUT_TIMES_CHOICES, null=True, blank=True)
    available_equipment = models.CharField(max_length=20, choices=EQUIPMENT_CHOICES, null=True, blank=True)
    has_plan = models.BooleanField(null=True, blank=True)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='customuser_set',
        related_query_name='user',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_set',
        related_query_name='user',
    )

    def save(self, *args, **kwargs):
        if self.height and self.weight:
            self.bmi = round(self.weight / ((self.height / 100) ** 2), 1)
        else:
            self.bmi = None
        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return self.username
    
class Exercise(models.Model):
    DIFFICULTY_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    TYPE_CHOICES = [
        ('Flexibility', 'Flexibility'),
        ('Strength', 'Strength'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    age = models.CharField(max_length=50)
    injury = models.CharField(max_length=255)
    muscle_group = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    equipment = models.CharField(max_length=100)
    description = models.TextField()
    bmi = models.CharField(max_length=50)
    image = models.ImageField(
        upload_to='exercise_images/', 
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])],
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
    
class WorkoutPlan(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='workout_plans')
    plan_data = models.JSONField()
    
    def __str__(self):
        plan_summary = json.dumps(self.plan_data, indent=2)
        return f"Plan for {self.user.username}: {plan_summary[:100]}..."  # Show a summary for brevity