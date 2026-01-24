import os

class Config:
    # SQLite Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///teamvcu.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Secret for validating tokens from frontend
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"
    
    # Flask settings
    SECRET_KEY = "1A5FRpKGlLKVmzQsUPW1M3EEWO0svxHQplbHps9Hhzj2iuv8tHMFSm6B3cQRzyh3Rgq7sUq+4CdxsR4BwBKpXg=="
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB