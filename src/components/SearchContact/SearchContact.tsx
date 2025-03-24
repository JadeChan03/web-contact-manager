import { Input, IconButton } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search'; 

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
    endDecorator={
      <IconButton
          onClick={() => setSearchTerm('')} // clear the search term when clicked
          aria-label="Clear search"
        >
          <SearchIcon />
        </IconButton>
    }
    sx={{width:'100%', borderRadius: '8px'}}
  />
);


