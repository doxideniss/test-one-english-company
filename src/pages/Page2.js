import React from 'react';
import {
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { debounce } from "../utils";

const useStyle = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '20px',
  },
  table: {
    height: '800px'
  }
}));

const items = new Array(20000).fill().map((_, id) => ({
  id: id + 1,
  text: `Item ${id + 1}`
}));

const Page2 = ({ dispatch, selectedItems }) => {
  const classes = useStyle();
  const [prevData, setPrevData] = React.useState(items.slice(0, 200));
  const [count, setCount] = React.useState({
    prev: 0,
    next: 200
  });

  React.useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Страница 2'
    });
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n.id);
      dispatch({
        type: 'SET_CHECKED',
        payload: newSelecteds
      });
      return;
    }
    dispatch({
      type: 'SET_CHECKED',
      payload: []
    })
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);

    if (selectedIndex === -1) {
      dispatch({
        type: 'ADD_CHECKED',
        payload: id
      })
    } else if (selectedIndex >= 0) {
      dispatch({
        type: 'REMOVE_CHECKED',
        payload: id
      })
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > e.target.scrollHeight - 2000) {
      setPrevData([
        ...prevData,
        ...items.slice(count.prev + 200, count.next + 200)
      ]);
      setCount((prevState) => ({ prev: prevState.prev + 200, next: prevState.next + 200 }))
    }
  };

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <TableContainer onScroll={debounce(handleScroll, 500)} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'Выбрать все' }}
                />
              </TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prevData.map((row) => {
              const isItemSelected = isSelected(row.id);

              return (
                <TableRow key={row.id}
                          hover
                          selected={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.text}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page2;
