import { Link } from 'react-router-dom';
import {
  TableCell,
  TableRow,
} from '@mui/material';

const UserInfoListEntry = ({ userinfo }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${userinfo.id}`}>{userinfo.name}</Link>
      </TableCell>
      <TableCell>{userinfo.blogs.length}</TableCell>
    </TableRow>
  );
};

export default UserInfoListEntry;
