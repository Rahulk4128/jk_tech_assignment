import * as Yup from 'yup';

const emailRegExp =
	// eslint-disable-next-line
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const onlyCharacterRegExp = /^[aA-zZ\s]+$/;
const onlyAlaphaNumericRegExp = /^[a-zA-Z0-9\s]+$/;
const passwordRegExp =
	// eslint-disable-next-line
	/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

//sing up
export const SignUpValidationSchema = Yup.object().shape({
	name: Yup.string()
		.strict()
		.trim('The first name cannot include leading and trailing spaces')
		.required('First name is required.')
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must not exceed 50 characters.')
		.matches(
			onlyAlaphaNumericRegExp,
			'No special character allowed for this field',
		),

	email: Yup.string()
		.strict()
		.trim('The email cannot include leading and trailing spaces')
		.required('Email is required')
		.matches(emailRegExp, 'Email is invalid'),
	password: Yup.string()
		.strict()
		.trim('The password cannot include leading and trailing spaces')
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(32, 'Password must not exceed 32 characters')
		// eslint-disable-next-line
		.matches(
			passwordRegExp,
			'Password must contain 8 characters, one uppercase, one lowercase, one number and one special character (!, @, #, $, %, ^, &,*, (, ), , -, _, =, +, {, }, ;, :, <, ., >, and ,)',
		),
});
