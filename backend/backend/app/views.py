import json
import jwt
import datetime
import os
import base64
import subprocess
import tempfile
from urllib import request as urllib_request
from urllib import error as urllib_error
from urllib.parse import urlencode
from pathlib import Path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import User

SECRET_KEY = os.getenv("JWT_SECRET_KEY", settings.SECRET_KEY)


def _authenticate_request(request):
    auth_header = request.headers.get('Authorization') or ''
    if not auth_header.startswith('Bearer '):
        return None, JsonResponse({'message': 'Unauthorized'}, status=401)

    token = auth_header.split(' ', 1)[1].strip()
    if not token:
        return None, JsonResponse({'message': 'Unauthorized'}, status=401)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return None, JsonResponse({'message': 'Token expired'}, status=401)
    except jwt.InvalidTokenError:
        return None, JsonResponse({'message': 'Invalid token'}, status=401)

    user = User.objects(id=payload.get('id')).first()
    if not user:
        return None, JsonResponse({'message': 'User not found'}, status=404)

    return user, None


@csrf_exempt
def register(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    data = json.loads(request.body)

    if User.objects(email=data['email']).first():
        return JsonResponse({'message': 'Email already exists'}, status=400)

    user = User(
        email=data['email'],
        full_name=data.get('fullName', '')
    )
    user.set_password(data['password'])
    user.save()

    return JsonResponse({'message': 'User created'}, status=201)


@csrf_exempt
def login(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    data = json.loads(request.body)

    user = User.objects(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return JsonResponse({'message': 'Invalid credentials'}, status=401)
    
    token = jwt.encode(
        {
            'id': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        },
        SECRET_KEY,
        algorithm='HS256'
    )

    return JsonResponse({
        'token': token,
        'user': {
            'fullName': user.full_name,
            'email': user.email
        }
    })

@csrf_exempt
def get_profile(request):
    if request.method != 'GET':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)
        
        return JsonResponse({
            'fullName': user.full_name,
            'email': user.email,
            'createdAt': user.created_at.isoformat() if user.created_at else None
        })
    except jwt.ExpiredSignatureError:
        return JsonResponse({'message': 'Token expired'}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({'message': 'Invalid token'}, status=401)


@csrf_exempt
def update_profile(request):
    if request.method != 'PUT':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)
        
        data = json.loads(request.body)
        if 'fullName' in data:
            user.full_name = data['fullName']
        if 'password' in data and data['password']:
            user.set_password(data['password'])
        
        user.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

from .models import History

@csrf_exempt
def get_history(request):
    if request.method != 'GET':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        
        history = History.objects(user=user).limit(10)
        history_data = [
            {
                'action': h.action_type,
                'content': h.content,
                'timestamp': h.timestamp.isoformat()
            }
            for h in history
        ]
        return JsonResponse({'history': history_data})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def add_history(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        
        data = json.loads(request.body)
        history = History(
            user=user,
            action_type=data.get('action'),
            content=data.get('content')
        )
        history.save()
        return JsonResponse({'message': 'History added'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

from .models import ChatSession, ChatMessage, Project

@csrf_exempt
def create_chat_session(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    user, auth_error = _authenticate_request(request)
    if auth_error:
        return auth_error

    try:
        data = json.loads(request.body)
        project = None
        project_id = data.get('projectId')
        if project_id:
            project = Project.objects(id=project_id, user=user).first()
            if not project:
                return JsonResponse({'message': 'Project not found'}, status=404)

        session = ChatSession(
            user=user,
            project=project,
            title=data.get('title', 'New Chat')
        )
        session.save()
        return JsonResponse({
            'id': str(session.id),
            'title': session.title,
            'projectId': str(project.id) if project else None
        })
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def get_chat_sessions(request):
    if request.method != 'GET':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    user, auth_error = _authenticate_request(request)
    if auth_error:
        return auth_error

    try:
        project_id = request.GET.get('projectId')
        if project_id:
            project = Project.objects(id=project_id, user=user).first()
            if not project:
                return JsonResponse({'message': 'Project not found'}, status=404)
            sessions = ChatSession.objects(user=user, project=project)
        else:
            sessions = ChatSession.objects(user=user)

        session_data = [
            {
                'id': str(s.id),
                'title': s.title,
                'created_at': s.created_at.isoformat(),
                'projectId': str(s.project.id) if s.project else None
            }
            for s in sessions
        ]
        return JsonResponse({'sessions': session_data})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def get_chat_messages(request, session_id):
    if request.method != 'GET':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)

        session = ChatSession.objects(id=session_id, user=user).first()
        if not session:
             return JsonResponse({'message': 'Session not found'}, status=404)

        messages = ChatMessage.objects(session=session)
        message_data = [
            {'role': m.role, 'content': m.content, 'timestamp': m.timestamp.isoformat()}
            for m in messages
        ]
        return JsonResponse({'messages': message_data})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def save_chat_message(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)
        
        data = json.loads(request.body)
        session_id = data.get('sessionId')
        session = ChatSession.objects(id=session_id, user=user).first()
        if not session:
            return JsonResponse({'message': 'Session not found'}, status=404)
        
        message = ChatMessage(
            session=session,
            role=data.get('role'),
            content=data.get('content')
        )
        message.save()
        return JsonResponse({'message': 'Message saved'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def delete_chat_session(request, session_id):
    if request.method != 'DELETE':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)
        
        session = ChatSession.objects(id=session_id, user=user).first()
        if session:
            # Delete messages first
            ChatMessage.objects(session=session).delete()
            session.delete()
        
        return JsonResponse({'message': 'Session deleted'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
def delete_all_chat_sessions(request):
    if request.method != 'DELETE':
        return JsonResponse({'message': 'Method not allowed'}, status=405)
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return JsonResponse({'message': 'Unauthorized'}, status=401)
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        
        sessions = ChatSession.objects(user=user)
        for session in sessions:
            ChatMessage.objects(session=session).delete()
            session.delete()
            
        return JsonResponse({'message': 'All chat sessions deleted'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)


@csrf_exempt
def replace_chat_messages(request, session_id):
    if request.method != 'PUT':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'message': 'Unauthorized'}, status=401)

    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user = User.objects(id=payload['id']).first()
        if not user:
            return JsonResponse({'message': 'User not found'}, status=404)

        session = ChatSession.objects(id=session_id, user=user).first()
        if not session:
            return JsonResponse({'message': 'Session not found'}, status=404)

        data = json.loads(request.body or '{}')
        messages = data.get('messages', [])
        if not isinstance(messages, list):
            return JsonResponse({'message': 'Invalid messages payload'}, status=400)

        ChatMessage.objects(session=session).delete()
        for item in messages:
            role = item.get('role')
            content = (item.get('content') or '').strip()
            if role not in ('user', 'assistant') or not content:
                continue
            ChatMessage(session=session, role=role, content=content).save()

        return JsonResponse({'message': 'Messages replaced'})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)


@csrf_exempt
def get_projects(request):
    if request.method != 'GET':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    user, auth_error = _authenticate_request(request)
    if auth_error:
        return auth_error

    try:
        projects = Project.objects(user=user)
        project_data = [
            {
                'id': str(project.id),
                'name': project.name,
                'icon': project.icon,
                'created_at': project.created_at.isoformat() if project.created_at else None
            }
            for project in projects
        ]
        return JsonResponse({'projects': project_data})
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)


@csrf_exempt
def create_project(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    user, auth_error = _authenticate_request(request)
    if auth_error:
        return auth_error

    try:
        data = json.loads(request.body or '{}')
        name = (data.get('name') or '').strip()
        if not name:
            return JsonResponse({'message': 'Project name is required'}, status=400)

        icon = (data.get('icon') or '📁').strip()[:8]
        if not icon:
            icon = '📁'

        project = Project(user=user, name=name[:120], icon=icon)
        project.save()

        return JsonResponse({
            'id': str(project.id),
            'name': project.name,
            'icon': project.icon,
            'created_at': project.created_at.isoformat() if project.created_at else None
        }, status=201)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)


@csrf_exempt
def apply_image_tools(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON payload'}, status=400)

    image_data_url = payload.get('imageDataUrl') or ''
    tools = payload.get('tools') or {}
    if not image_data_url.startswith('data:image/'):
        return JsonResponse({'message': 'imageDataUrl must be a valid data URL'}, status=400)
    if not isinstance(tools, dict):
        return JsonResponse({'message': 'tools must be an object'}, status=400)

    try:
        _, encoded = image_data_url.split(',', 1)
        image_bytes = base64.b64decode(encoded)
    except Exception:
        return JsonResponse({'message': 'Invalid imageDataUrl content'}, status=400)

    project_root = Path(__file__).resolve().parents[3]
    tool_script = project_root / 'tolse' / 'image_tools.py'
    if not tool_script.exists():
        return JsonResponse({'message': f'Tool script not found: {tool_script}'}, status=500)

    def _to_float(value, default):
        try:
            return float(value)
        except Exception:
            return default

    def _to_int(value, default):
        try:
            return int(float(value))
        except Exception:
            return default

    with tempfile.TemporaryDirectory(prefix='img_tools_') as temp_dir:
        temp_path = Path(temp_dir)
        input_path = temp_path / 'input.png'
        output_path = temp_path / 'output.png'
        input_path.write_bytes(image_bytes)

        cmd = [
            'python3',
            str(tool_script),
            '--input',
            str(input_path),
            '--output',
            str(output_path),
        ]

        crop = (tools.get('crop') or '').strip()
        resize = (tools.get('resize') or '').strip()
        filter_name = (tools.get('filter') or 'none').strip()
        text = tools.get('text') or ''
        text_pos = (tools.get('textPos') or '40,40').strip()
        text_size = _to_int(tools.get('textSize'), 14)
        text_color = (tools.get('textColor') or '#ffffff').strip()
        sticker = tools.get('sticker') or ''
        sticker_pos = (tools.get('stickerPos') or '80,80').strip()
        sticker_size = _to_int(tools.get('stickerSize'), 14)
        sticker_opacity = _to_int(tools.get('stickerOpacity'), 100)

        if crop:
            cmd.extend(['--crop', crop])
        if resize:
            cmd.extend(['--resize', resize])

        cmd.extend([
            '--rotate', str(_to_float(tools.get('rotate'), 0.0)),
            '--filter', filter_name or 'none',
            '--brightness', str(_to_float(tools.get('brightness'), 1.0)),
            '--contrast', str(_to_float(tools.get('contrast'), 1.0)),
            '--saturation', str(_to_float(tools.get('saturation'), 1.0)),
            '--temperature', str(_to_int(tools.get('temperature'), 0)),
            '--blur', str(_to_float(tools.get('blur'), 0.0)),
            '--sharpen', str(_to_float(tools.get('sharpen'), 1.0)),
            '--bg-remove', str(_to_int(tools.get('bgRemove'), 0)),
            '--exposure', str(_to_float(tools.get('exposure'), 0.0)),
            '--text', text,
            '--text-pos', text_pos,
            '--text-size', str(text_size),
            '--text-color', text_color,
            '--sticker', sticker,
            '--sticker-pos', sticker_pos,
            '--sticker-size', str(sticker_size),
            '--sticker-opacity', str(sticker_opacity),
        ])

        for heal in tools.get('heal', []) or []:
            if isinstance(heal, str) and heal.strip():
                cmd.extend(['--heal', heal.strip()])
        for brush in tools.get('brush', []) or []:
            if isinstance(brush, str) and brush.strip():
                cmd.extend(['--brush', brush.strip()])
        for clone in tools.get('clone', []) or []:
            if isinstance(clone, str) and clone.strip():
                cmd.extend(['--clone', clone.strip()])

        try:
            result = subprocess.run(
                cmd,
                check=False,
                capture_output=True,
                text=True,
                timeout=90,
                cwd=str(project_root),
            )
        except subprocess.TimeoutExpired:
            return JsonResponse({'message': 'Python image tools timed out'}, status=504)
        except Exception as exc:
            return JsonResponse({'message': f'Failed to run Python tools: {exc}'}, status=500)

        if result.returncode != 0:
            message = (result.stderr or result.stdout or 'Python tool execution failed').strip()
            return JsonResponse({'message': message}, status=400)

        if not output_path.exists():
            return JsonResponse({'message': 'Python tools did not produce output image'}, status=500)

        output_b64 = base64.b64encode(output_path.read_bytes()).decode('utf-8')
        return JsonResponse({
            'editedDataUrl': f'data:image/png;base64,{output_b64}'
        })


@csrf_exempt
def gemini_generate_image(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Method not allowed'}, status=405)

    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON payload'}, status=400)

    api_key = (payload.get('apiKey') or '').strip()
    api_key = ''.join(api_key.split())
    prompt = (payload.get('prompt') or '').strip()
    model = (payload.get('model') or 'gemini-2.0-flash').strip()
    image_data_url = (payload.get('imageDataUrl') or '').strip()

    if not api_key:
        return JsonResponse({'message': 'Gemini API key is required'}, status=400)
    if any(ord(ch) < 33 for ch in api_key):
        return JsonResponse({'message': 'Gemini API key contains invalid whitespace/control characters'}, status=400)
    if '://' in api_key or '/' in api_key:
        return JsonResponse({'message': 'Gemini API key looks invalid. Paste only the API key value.'}, status=400)
    if not prompt:
        return JsonResponse({'message': 'Prompt is required'}, status=400)

    parts = [{'text': prompt}]
    if image_data_url.startswith('data:image/'):
        try:
            header, b64data = image_data_url.split(',', 1)
            mime_type = header.split(';')[0].replace('data:', '') or 'image/png'
            parts.insert(0, {
                'inline_data': {
                    'mime_type': mime_type,
                    'data': b64data
                }
            })
        except Exception:
            return JsonResponse({'message': 'Invalid imageDataUrl format'}, status=400)

    request_bodies = [
        {
            'contents': [
                {
                    'parts': parts
                }
            ],
            'generationConfig': {
                'responseModalities': ['IMAGE']
            }
        },
        {
            'contents': [
                {
                    'parts': parts
                }
            ]
        }
    ]

    def _extract_error_message(raw_text, status_code):
        try:
            err_payload = json.loads(raw_text)
            return (
                err_payload.get('error', {}).get('message')
                or err_payload.get('message')
                or f'Gemini API error ({status_code})'
            )
        except Exception:
            return raw_text or f'Gemini API error ({status_code})'

    def _call_generate(version, model_name, body):
        endpoint = (
            f'https://generativelanguage.googleapis.com/{version}/models/{model_name}:generateContent'
            f'?{urlencode({"key": api_key})}'
        )
        req = urllib_request.Request(
            endpoint,
            data=json.dumps(body).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib_request.urlopen(req, timeout=90) as response:
            return json.loads(response.read().decode('utf-8'))

    def _list_models(version):
        endpoint = f'https://generativelanguage.googleapis.com/{version}/models?{urlencode({"key": api_key})}'
        req = urllib_request.Request(endpoint, method='GET')
        with urllib_request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read().decode('utf-8'))
            models = data.get('models') or []
            usable = []
            for item in models:
                methods = item.get('supportedGenerationMethods') or []
                if 'generateContent' in methods:
                    name = (item.get('name') or '').replace('models/', '')
                    if name:
                        usable.append(name)
            return usable

    requested_model = model.replace('models/', '')
    tried = []
    last_model_error = ''
    candidate_models = [
        requested_model,
        'gemini-2.0-flash-preview-image-generation',
        'gemini-2.5-flash-image-preview',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
    ]

    for version in ('v1beta', 'v1'):
        try:
            listed = _list_models(version)
            for item in listed[:10]:
                if item not in candidate_models:
                    candidate_models.append(item)
        except Exception:
            pass

        for model_name in candidate_models:
            if (version, model_name) in tried:
                continue
            tried.append((version, model_name))

            model_succeeded = False
            for body in request_bodies:
                try:
                    response_data = _call_generate(version, model_name, body)
                    candidates = response_data.get('candidates') or []
                    for candidate in candidates:
                        content = candidate.get('content') or {}
                        for part in (content.get('parts') or []):
                            inline = part.get('inlineData') or part.get('inline_data')
                            if inline and inline.get('data'):
                                mime_type = inline.get('mimeType') or inline.get('mime_type') or 'image/png'
                                return JsonResponse({
                                    'imageDataUrl': f"data:{mime_type};base64,{inline['data']}",
                                    'modelUsed': model_name,
                                    'apiVersionUsed': version
                                })
                    model_succeeded = True
                except urllib_error.HTTPError as exc:
                    raw = exc.read().decode('utf-8', errors='ignore')
                    message = _extract_error_message(raw, exc.code)
                    lowered = message.lower()
                    model_issue = (
                        'not found' in lowered
                        or 'not supported' in lowered
                        or 'unsupported' in lowered
                        or 'for api version' in lowered
                        or 'response modalities' in lowered
                    )
                    if model_issue:
                        last_model_error = message
                        continue
                    return JsonResponse({'message': message}, status=400)
                except Exception as exc:
                    return JsonResponse({'message': f'Failed to call Gemini API: {exc}'}, status=500)

            if model_succeeded:
                last_model_error = f'Model "{model_name}" responded but returned no image.'
                continue

    available = []
    for version in ('v1beta', 'v1'):
        try:
            for m in _list_models(version):
                if m not in available:
                    available.append(m)
        except Exception:
            pass

    if available:
        return JsonResponse({
            'message': (
                f'{last_model_error or "Requested Gemini model is unavailable."} '
                f'Use one of: {", ".join(available[:12])}'
            )
        }, status=400)

    return JsonResponse({
        'message': last_model_error or 'Gemini model unavailable and no compatible models were found.'
    }, status=400)
