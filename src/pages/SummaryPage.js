import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import sendTransaction from "../utils/sendTransaction";
import { PROVINCES, DONATION_ADDRESS, HAPPINESS_LABEL } from "../constants";
import { isReferenced } from "@babel/types";

export default function SummaryPage({
  favoriteCandidate,
  happyWithProgress,
  birthday,
  province,
  temperature
}) {
  const [candidateAmt, setCandidateAmt] = React.useState(0);
  const [charityAmt, setCharityAmt] = React.useState(0);
  let provinces = {};
  PROVINCES.map(v => (provinces[v.code] = v.name));

  const toCandidate = e => {
    setCandidateAmt(e.target.value);
  };

  const toCharity = e => {
    setCharityAmt(e.target.value);
  };

  const submission = () => {
    let sendAmount = 0;
    let message = "";
    if (candidateAmt > 0) {
      sendAmount = candidateAmt;
      message = "candidate";
    } else if (charityAmt > 0) {
      sendAmount = charityAmt;
      message = "charity";
    }
    sendTransaction({
      valueInEth: sendAmount,
      gas: 25000,
      toAddress: DONATION_ADDRESS,
      msg: message
    });
  };

  const isValid = () => {
    if (charityAmt > 0 && candidateAmt > 0) {
      return true;
    } else {
      return false;
    }
  };

  const birthdayToString = () => {
    if (birthday) {
      return `${birthday.getMonth() + 1}/${birthday.getDate() +
        1}/${birthday.getFullYear()}`;
    }
    return "";
  };

  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography component="h3">Summary Page</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">Who is your favorite candidate?</Typography>
        <Typography component="p">{favoriteCandidate}</Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">
          How happy are you with the current progress?
        </Typography>
        <Typography component="p">
          {HAPPINESS_LABEL[happyWithProgress]}
        </Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">When is your birthday?</Typography>
        <Typography component="p">{birthdayToString()}</Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">Which province do you reside in?</Typography>
        <Typography component="p">{provinces[province]}</Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">
          What is your ideal room temperature?
        </Typography>
        <Typography component="p">{temperature + "°C"}</Typography>
      </Grid>
      <Box m={3} />
      <Grid item={true}>
        <TextField
          onChange={toCandidate}
          id="outlined-basic"
          label="Donate ETH to your candidate (optional)"
          variant="outlined"
          value={candidateAmt}
        />
        <TextField
          onChange={toCharity}
          id="outlined-basic"
          label="Donate ETH to your charity (optional)"
          variant="outlined"
          value={charityAmt}
        />
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Button onClick={submission} disabled={isValid()}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
