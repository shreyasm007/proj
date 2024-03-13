import pandas as pd
from faker import Faker
import random
 
fake = Faker()
 
# Generate 50 random entries
data = {
'Team': [fake.company() for _ in range(50)],
    'Purchasing Date': [fake.date_this_decade() for _ in range(50)],
    'License Expiration Date': [fake.future_date(end_date='+1y') for _ in range(50)],
    'Price': [f"${random.randint(500, 2000)}" for _ in range(50)]
}
 
# Create a DataFrame
df = pd.DataFrame(data)
 
# Specify the Excel file path
excel_path = 'random_licensing_info.xlsx'
 
# Write the DataFrame to an Excel sheet
df.to_excel(excel_path, index=False, sheet_name='Licensing Information')
 
print(f"Excel sheet '{excel_path}' created successfully with randomly generated licensing information.")