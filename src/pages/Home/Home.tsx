import { ContactList } from '../../components/ContactList/ContactList'
import { AddContact } from '../../components/AddContact/AddContact'
// import { AddContactForm } from '../../components/AddContact/AddContactForm'
function Home() {
	return (
		<>
		<h1>people</h1>
		{/* <AddContactForm/> */}
		<AddContact/>
		<ContactList/>
		
		</>
	)
}

export default Home