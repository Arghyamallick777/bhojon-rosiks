const AppConfig = {
    /**
     * Possible values
     * 
     * email+password
     * 
     * phone+password
     * 
     * email-otp
     * 
     * phone+otp
     * 
     * userid+password
     */
    auth_type: 'email+password',
    auth_user_id_key: 'email',
    /** This will be used to get the value from the body of the request.
     * Will be ignored if you use the auth_type with otp combination
     */
    auth_password_key: 'password',
    is_registration_enabled: false,
    is_frontend_auth_enabled: false,
    registration_keys: [
        {post_key: 'first_name', column_key: 'first_name', required: true},
        {post_key: 'last_name', column_key: 'last_name', required: true},
        {post_key: 'email', column_key: 'email', required: true, unique: true},
        {post_key: 'phone', column_key: 'phone', required: true, unique: true},
        {post_key: 'password', column_key: 'password', required: true},
        {post_key: 'confirm_password', column_key: '', required: true, skip: true},
        {post_key: 'user_type', column_key: 'user_type', required: false, default: 'user'}
    ],
    auth_primary_userid: 'email',
    forget_password_primary_userid: 'email',
    auth_unique_keys: ['email', 'phone'],
    login_after_registration: true,
    verify_register: true,
    verify_register_method: 'otp',
    otp_length: 6,
    otp_alpha_numeric: false,
    template_path: '',
    auth_token_initial_text: 'Bearer',
    auth_token_separator: ' ',
    auth_token_key: 'authorization',
    auth_single_session: false,
    throw_error_on_single_session: false,
    // Flag to enable the password hash
    // if true then password will be stored as hashed provided with the hash algorithm
    hash_password: true,
    /** The algorithm to use for all the hash. If omitted then the default SHA-256 will be used  */
    hash_algo: 'sha256',

    forget_password_flow: 'otp', // otp | link 

    /** Array of column names of the user table
    // that should be excluded in the generation of acces token and refresh token
    // As well as exclude from the response of register and login */
    auth_user_excluded_cols: [
        'password',
        'createdAt',
        'updatedAt'
    ],
    /** Provide the model name used for the admin table if any.
    if omitted then User will be used */
    admin_model: 'User',
    skip_auth: [
        {path: '/auth/login/?', method: 'POST'},
        {path: '/auth/register/?', method: 'POST'},
        {path: '/auth/resend-otp/?', method: 'POST'},
        {path: '/auth/verify-otp/?', method: 'POST'},
        {path: '/auth/forget-password/?', method: 'POST'},
        {path: '/auth/reset-password/?', method: 'POST'},
        {path: '/auth/admin/?', method: 'POST'},
    ],
    notification_templates: [
        {
            key: 'auth_login',
            template: '',
            text: '',
        },
        {
            key: 'auth_registration',
            template: '',
            text: '',
        },
        {
            key : 'auth_forget_password_otp',
            template: '',
            text: '',
        },
        {
            key : 'auth_forget_password_link',
            subject: 'Reset Password Request',
            template: 'Your reset password link is {{link}}.',
            text: 'Your reset password link is {{link}}.',
        },

        // Keep adding here
    ],
    getAuthType: () => AppConfig.auth_type.split("+")[1]
};

module.exports = AppConfig;