import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { GlassMagnifier } from "react-image-magnifiers";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  imgWrapper: {
    width: 600,
    height: 550,
    // "& img": {
    //   maxWidth: 600,
    //   maxHeight: 550,
    // }
  }
}));

export default function ResponsiveDialog(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
    
    <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title"><CloseIcon onClick={handleClose}/></DialogTitle>
      <div className={classes.imgWrapper}>
        <GlassMagnifier
          imageSrc={props.img}
          imageAlt="image"
        />
      </div> 
    </Dialog>
    </div>
  );
}
