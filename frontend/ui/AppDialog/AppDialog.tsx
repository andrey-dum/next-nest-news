import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    open: boolean;
    handleClose: () => void;
    title?: string;
}

export const AppDialog: React.FC<Props> = ({ 
  open, 
  handleClose,
  title,
  children,
  ...rest
}) => {

  return (
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
        {...rest}
      >
        {title && <DialogTitle className="dialogTitle">{title}</DialogTitle>}
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
  );
}
