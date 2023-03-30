import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { initializeUsers } from '../../reducers/userListReducer';
import UserInfoListEntry from './UserInfoListEntry';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

const UsersList = () => {
  const userList = useSelector(state => state.userList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow >
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow >
          {userList.slice()
            .map((user) => (
              <UserInfoListEntry key={user.id} userinfo={user} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;