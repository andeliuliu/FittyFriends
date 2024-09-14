# Importing the API and instantiating the client using your keys
from terra.base_client import Terra
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('API_KEY')
DEV_ID = os.getenv('DEV_ID')
SECRET = os.getenv('SECRET')


terra = Terra(API_KEY, DEV_ID, SECRET)

#parsed_api_response = terra.list_providers().get_parsed_response()
#print(parsed_api_response)

#parsed_api_response = terra.list_users().get_parsed_response()
#print(parsed_api_response)

widget_response = terra.generate_widget_session(
    reference_id="USER ID IN YOUR APP",
    providers=["FITBIT", "GARMIN", "GOOGLE", "OURA"],
    auth_success_redirect_url="https://success.url",
    auth_failure_redirect_url="https://failure.url",
    language="en"
).get_parsed_response()

print(widget_response)