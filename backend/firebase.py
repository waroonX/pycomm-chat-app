import firebase_admin
from firebase_admin import credentials, firestore
from os.path import join, dirname
import os

def get_firebase_client():
    key_path = join(dirname(__file__), 'appServiceKey.json')
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)
    firestore_client = firestore.client()
    return firestore_client
