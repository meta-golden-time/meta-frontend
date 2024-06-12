import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DaumPostcode from 'react-daum-postcode';

function SimpleDialog(props) {
  const { onClose, selectedValue, open, onAddressSelect } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const style = {
    width: "400px",
    height: "600px",
    border: "1.4px solid #333333",
  };

  const completeHandler = (data) => {
    console.log(data);
    if(data.userSelectedType == "R") {
      onAddressSelect(data.zonecode + '\n' + data.autoJibunAddress );
    } else {
      onAddressSelect(data.zonecode + '\n' + data.roadAddress);
    }
    handleClose(); // 모달 닫기
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>주소찾기</DialogTitle>
      <div>
        <DaumPostcode 
          style={style}
          onComplete={completeHandler}
        />
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onAddressSelect: PropTypes.func.isRequired,
};

export default function SimpleDialogDemo({ onAddressSelect }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        주소 찾기
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        onAddressSelect={onAddressSelect}
      />
    </div>
  );
}
