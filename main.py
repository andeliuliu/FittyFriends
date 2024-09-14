# Importing the API and instantiating the client using your keys
from terra.base_client import Terra

API_KEY = "oIlZFaa6GgYLVuig6u9upWMoINIwGMby"
DEV_ID = "4actk-hackmit2024-testing-k5ppSHVQCs"
SECRET = "c170444a996882b86bd2a4e10295854b37fc1b34886aaa86"


terra = Terra(API_KEY, DEV_ID, SECRET)

parsed_api_response = terra.list_providers().get_parsed_response()
print(parsed_api_response)

#parsed_api_response = terra.list_users().get_parsed_response()
#print(parsed_api_response)