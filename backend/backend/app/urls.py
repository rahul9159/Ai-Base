from django.urls import path
from .views import register, login, get_profile, update_profile, get_history, add_history
from .views import create_chat_session, get_chat_sessions, get_chat_messages, save_chat_message, delete_chat_session, delete_all_chat_sessions, replace_chat_messages
from .views import get_projects, create_project
from .views import apply_image_tools
from .views import gemini_generate_image

urlpatterns = [
    path('api/register/', register),
    path('api/login/', login),
    path('api/user/profile/', get_profile),
    path('api/user/profile/update/', update_profile),
    path('api/user/history/', get_history),
    path('api/user/history/add/', add_history),
    path('api/projects/', get_projects),
    path('api/projects/create/', create_project),
    path('api/image-tools/apply/', apply_image_tools),
    path('api/gemini/generate-image/', gemini_generate_image),

    # Chat API
    path('api/chat/sessions/', get_chat_sessions),
    path('api/chat/sessions/create/', create_chat_session),
    path('api/chat/sessions/<str:session_id>/messages/', get_chat_messages),
    path('api/chat/sessions/<str:session_id>/replace-messages/', replace_chat_messages),
    path('api/chat/sessions/<str:session_id>/delete/', delete_chat_session),
    path('api/chat/sessions/delete-all/', delete_all_chat_sessions),
    path('api/chat/messages/save/', save_chat_message),
]
