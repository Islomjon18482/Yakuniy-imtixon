import { makeStyles } from '@mui/styles';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid skyblue",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "skyblue" : "",
      color: selected ? "black" : "white",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "skyblue",
        color: "black",
      },
      width: "22%",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;