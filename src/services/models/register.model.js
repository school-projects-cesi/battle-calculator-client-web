import * as Yup from 'yup'

// main
const schema = Yup.object().shape({
	username: Yup.string().required("Le nom d'utilisateur est requis"),
	email: Yup.string().required("L'email est requis").email("L'email n'est pas valide"),
	password: Yup.string().required('Le mot de passe est requis'),
})

// exports
export default schema
