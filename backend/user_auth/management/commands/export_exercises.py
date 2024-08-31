from django.core.management.base import BaseCommand
import os
import django
import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from user_auth.models import Exercise

class Command(BaseCommand):
    help = 'Export exercises to an Excel file'

    def handle(self, *args, **kwargs):
        # Retrieve exercises from the database
        exercises = Exercise.objects.all()

        # Prepare data with sequential IDs
        data = [
            {
                "ID": idx + 1,  # Sequential ID starting from 1
                "Name": exercise.name,
                "Difficulty": exercise.difficulty,
                "Age": exercise.age,
                "Injury": exercise.injury,
                "Muscle Group": exercise.muscle_group,
                "Type": exercise.type,
                "Equipment": exercise.equipment,
                "Description": exercise.description,
                "BMI Range": exercise.bmi,
            }
            for idx, exercise in enumerate(exercises)
        ]

        # Convert to DataFrame
        df = pd.DataFrame(data)

        # Determine the directory of the running script
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Specify the output file path relative to the script's directory
        output_file = os.path.join(script_dir, "exercises.xlsx")
        df.to_excel(output_file, index=False)

        # Print success message
        self.stdout.write(self.style.SUCCESS(f'Data successfully exported to {output_file}'))
