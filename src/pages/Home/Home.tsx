import { ContactList } from '../../components/ContactList/ContactList';
import { AddContact } from '../../components/AddContact/AddContact';
function Home() {
	return (
		<>
		<h1>people</h1>
		<AddContact/>
		<ContactList/>
		</>
	)
}

export default Home