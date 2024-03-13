import pandas as pd
 
# Load the Excel file
excel_path = 'random_licensing_info.xlsx'
df = pd.read_excel(excel_path)
 
# Convert DataFrame to JSON and save it to a file
json_path = './output_json_file.json'
df.to_json(json_path, orient='records', indent=2)
 
print(f"Excel file '{excel_path}' converted to JSON: '{json_path}'")