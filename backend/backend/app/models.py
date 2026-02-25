from mongoengine import Document, StringField, EmailField, BooleanField, DateTimeField, ReferenceField
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class User(Document):
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    full_name = StringField()
    is_paid = BooleanField(default=False)
    plan_type = StringField()  # monthly, yearly
    plan_expiry = DateTimeField()
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    def set_password(self, raw_password):
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)

class History(Document):
    user = ReferenceField(User, required=True)
    action_type = StringField(required=True)  # chat, voice, image, video, logo
    content = StringField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.utcnow)
    meta = {'ordering': ['-timestamp']}

class ChatSession(Document):
    user = ReferenceField(User, required=True)
    project = ReferenceField('Project', required=False, null=True)
    title = StringField(default="New Chat")
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    meta = {'ordering': ['-created_at']}

class ChatMessage(Document):
    session = ReferenceField(ChatSession, required=True)
    role = StringField(required=True)  # user, assistant
    content = StringField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.utcnow)
    meta = {'ordering': ['timestamp']}


class Project(Document):
    user = ReferenceField(User, required=True)
    name = StringField(required=True, max_length=120)
    icon = StringField(default='📁', max_length=8)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    meta = {'ordering': ['-created_at']}
