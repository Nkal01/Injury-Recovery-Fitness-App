import pandas as pd
from django.core.management.base import BaseCommand
from user_auth.models import Exercise

class Command(BaseCommand):
    help = 'Update exercises with weekly data from an Excel file'

    def handle(self, *args, **kwargs):
        # Hardcoded file path
        file_path = r"C:\Users\Nkal0\OneDrive\Documents\fProject\backend\user_auth\management\commands\weeks.xlsx"
        
        try:
            # Read the Excel file
            data = pd.read_excel(file_path)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading file: {e}"))
            return

        for _, row in data.iterrows():
            try:
                # Fetch the existing exercise by name
                exercise = Exercise.objects.get(name=row['Name'])
                
                # Update the week fields
                exercise.week1 = row['Week 1']
                exercise.week2 = row['Week 2']
                exercise.week3 = row['Week 3']
                
                # Save the updated exercise
                exercise.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully updated exercise: {exercise.name}'))
            except Exercise.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Exercise does not exist: {row["Name"]}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error updating exercise: {row["Name"]}. Error: {e}'))