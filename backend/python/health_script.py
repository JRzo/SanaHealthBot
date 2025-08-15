import json
import os
import pymongo
import dotenv
from pymongo.errors import ConnectionFailure, PyMongoError

# --- Prerequisites ---
# Before running this script, you must install the pymongo and python-dotenv libraries:
# pip install "pymongo[srv]" python-dotenv

# --- Step 1: Configuration ---
# Load environment variables from the .env file
dotenv.load_dotenv()

# Get the MongoDB URI from the environment variable
# Make sure your .env file contains a line like:
# MONGO_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/my_database?retryWrites=true&w=majority"
MONGO_URI = os.getenv("DB_STRING")
DATABASE_NAME = "SanaHealth"  # The name of your database
COLLECTION_NAME = "medical_data"  # The name of your collection

def load_data_from_json(file_path):
    """
    Loads data from a specified JSON file.

    Args:
        file_path (str): The path to the JSON file.

    Returns:
        list: A list of dictionaries (documents) from the JSON file.
    """
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from the file. Please check the file's formatting.")
        return None

def main():
    """
    Main function to connect to MongoDB and insert the data.
    """
    if not MONGO_URI:
        print("Error: MONGO_URI environment variable is not set. Please create a .env file with your connection string.")
        return

    print("Attempting to connect to MongoDB...")
    try:
        # Create a MongoDB client
        client = pymongo.MongoClient(MONGO_URI)

        # Check the connection by trying to list the database names
        client.admin.command('ping')
        print("Successfully connected to MongoDB!")

        # Get a reference to the database and collection
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]

        # Path to your JSON file
        json_file_path = "backend\python\data.json"

        # Load the data from the JSON file
        documents_to_insert = load_data_from_json(json_file_path)

        if documents_to_insert:
            # Delete any existing documents to ensure a clean slate
            # You can comment this out if you want to add to existing data
            print("Deleting existing documents in the collection...")
            collection.delete_many({})

            print(f"Inserting {len(documents_to_insert)} documents into the collection...")
            result = collection.insert_many(documents_to_insert)
            print(f"Successfully inserted {len(result.inserted_ids)} documents.")

    except ConnectionFailure:
        print("Failed to connect to MongoDB. Please check your MONGO_URI and network connection.")
    except PyMongoError as e:
        print(f"A PyMongo error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if 'client' in locals() and client:
            client.close()
            print("MongoDB connection closed.")

if __name__ == "__main__":
    main()
