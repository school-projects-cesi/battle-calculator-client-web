import * as Yup from 'yup'

// main
const schema = Yup.object().shape({
	username: Yup.string().required("Le nom d'utilisateur est requis"),
	email: Yup.string().email("L'email n'est pas valide").required("L'email est requis"),
	password: Yup.string().required('Le mot de passe est requis'),
})

// exports
export default schema
