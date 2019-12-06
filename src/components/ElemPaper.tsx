import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 2, 0, 2),
      maxWidth: 330,
    },
  }),
);

interface ElemPaperProps {
    title?: string,
    subtitle?: string
}

 const  ElemPaper: React.FC<ElemPaperProps> = ({ title = '', subtitle = '' }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" component="h6">
        {title}
      </Typography>
      <Typography component="p">
        {subtitle}
      </Typography>
    </Paper>
  );
}

export default ElemPaper