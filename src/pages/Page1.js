import React from 'react';
import { MenuList, MenuItem, Divider, Button,  Modal, Fade, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination, PaginationItem } from '@material-ui/lab';

const useStyle = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: '2px solid #000',
    outline: 'none',
    backgroundColor: '#fff',
    padding: '20px'
  },
  menuList: {
    height: '200px',
    overflowY: 'auto'
  },
  itemChecked: {
    backgroundColor: 'red'
  }
}));


const items = new Array(50).fill().map((_, id) => ({
  id: id + 1,
  text: `Item ${id + 1}`
}));

const Page1 = ({ dispatch, selectedItems }) => {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const refs = items.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  React.useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Страница 1'
    })
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCLick = (e, value) => {
    refs[value].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Button onClick={handleClick}>Открыть окно</Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Pagination count={items.length}
                        shape="rounded"
                        onChange={handleCLick}
                        renderItem={(item) => {
                          const isItemSelected = item.type === 'page' && isSelected(item.page);
                          return (
                            <PaginationItem className={isItemSelected ? classes.itemChecked : ''} {...item} />
                          )
                        }}/>

            <Divider />
            <MenuList className={classes.menuList}>
              { items.map(item => {
                const isItemSelected = isSelected(item.id);

                return (
                  <MenuItem className={isItemSelected ? classes.itemChecked : ''} key={item.id} ref={refs[item.id]}>{item.id} - {item.text}</MenuItem>
                )
              }) }
            </MenuList>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Page1;
