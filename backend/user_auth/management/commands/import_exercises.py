import pandas as pd
from django.core.management.base import BaseCommand
from user_auth.models import Exercise

class Command(BaseCommand):
    help = 'Import exercises from a hardcoded CSV file'

    def handle(self, *args, **kwargs):
        # Hardcoded file path
        file_path = r"C:\Users\Nkal0\OneDrive\Documents\fProject\backend\user_auth\management\commands\new_exercises.csv"
        
        try:
            data = pd.read_csv(file_path)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading file: {e}"))
            return

        for _, row in data.iterrows():
            exercise, created = Exercise.objects.get_or_create(
                name=row['Name'],
                difficulty=row['Difficulty'],
                age=row['Age'],
                injury=row['Injury'],
                muscle_group=row['Muscle Group'],
                type=row['Type'],
                equipment=row['Equipment'],
                description=row['Description'],
                bmi=row['BMI Range']
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created exercise: {exercise.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Exercise already exists: {exercise.name}'))