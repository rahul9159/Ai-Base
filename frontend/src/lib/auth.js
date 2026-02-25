const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/solutions/chat';

const ROLE_TO_ROUTE = {
    assistant: CHAT_ROUTE,
    chat: CHAT_ROUTE,
    chatbot: CHAT_ROUTE,
    user: DASHBOARD_ROUTE,
    drate: DASHBOARD_ROUTE,
    direct: DASHBOARD_ROUTE,
    admin: DASHBOARD_ROUTE,
    premium: DASHBOARD_ROUTE,
    free: DASHBOARD_ROUTE,
};

const safeParseUser = (value) => {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => Boolean(getToken());

export const getStoredUser = () => safeParseUser(localStorage.getItem('user'));

export const resolveUserHomeRoute = (user) => {
    if (!user || typeof user !== 'object') {
        return DASHBOARD_ROUTE;
    }

    const declaredRoute = user.defaultRoute;
    if (typeof declaredRoute === 'string' && declaredRoute.startsWith('/')) {
        return declaredRoute;
    }

    const roleValue = (
        user.userType ??
        user.role ??
        user.type ??
        user.accountType
    );

    if (typeof roleValue !== 'string') {
        return DASHBOARD_ROUTE;
    }

    const normalizedRole = roleValue.trim().toLowerCase();
    return ROLE_TO_ROUTE[normalizedRole] || DASHBOARD_ROUTE;
};

export const saveAuthSession = ({ token, user }) => {
    if (token) {
        localStorage.setItem('token', token);
    }
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};
