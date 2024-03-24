from faker import Faker
import pandas as pd
import random
from datetime import datetime, timedelta

fake = Faker()

def generate_random_data(num_records):
    data = []
    for _ in range(num_records):
        department = fake.department()
        team = fake.job()
        software_description = fake.sentence(nb_words=6, variable_nb_words=True)
        license_purchasing_date = fake.date_this_decade(before_today=True, after_today=False)
        license_expiry_date = fake.date_between_dates(date_start=datetime.strptime(license_purchasing_date, '%Y-%m-%d'),
                                                      date_end=datetime.strptime(license_purchasing_date, '%Y-%m-%d') + timedelta(days=random.randint(30, 365)))
        cost = round(random.uniform(1000, 10000), 2)
        requisition_number = fake.uuid4()
        
        data.append({
            'Department': department,
            'Team': team,
            'Software Description': software_description,
            'License Purchasing Date': license_purchasing_date,
            'License Expiry Date': license_expiry_date,
            'Cost': cost,
            'Requisition Number': requisition_number
        })
    return data

# Generate 25 random data records
random_data = generate_random_data(25)

# Convert data to a DataFrame
df = pd.DataFrame(random_data)

# Export DataFrame to Excel
excel_file = 'random_data.xlsx'
df.to_excel(excel_file, index=False)

print(f"Data exported to {excel_file}")
