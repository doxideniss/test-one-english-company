import React from 'react';
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  TextField,
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  table: {
    height: '700px',
    overflowY: 'auto'
  }
}));

const ListUsers = ({ handleUpdateUser, deleteUser, listUsers }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(listUsers);
  const [searchValue, setSearchValue] = React.useState('');
  const [deleteId, setDeleteId] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteClick = (id) => () => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteUser(deleteId);
    setOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setUsers(listUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toUpperCase().indexOf(value.toUpperCase()) >= 0;
    }));
  };

  return (
    <div className={classes.root}>
      {
        listUsers.length ? (
          <div>
            <Box mb='20px'>
              <TextField fullWidth label="Поиск" value={searchValue} onChange={handleSearch}/>
            </Box>
            <TableContainer  className={classes.table} component={Paper}>
              <Table aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell>ФИО</TableCell>
                    <TableCell align="center">Телефоны</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell align="center">{user.tel.join(', ')}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={handleUpdateUser(user)}>
                          <CreateIcon/>
                        </IconButton>
                        <IconButton onClick={handleDeleteClick(user.id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Typography align="center">Данных нет!</Typography>
        )
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Вы действительно хотите удалить этого пользователя?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отклонить
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListUsers;
