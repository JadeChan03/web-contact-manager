import { Input } from '@mui/joy';

interface SearchContactProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchContact: React.FunctionComponent<SearchContactProps> = ({
  searchTerm,
  setSearchTerm,
}) => (
  <Input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by any field (name, phone, email, address, etc.)"
  />
);


