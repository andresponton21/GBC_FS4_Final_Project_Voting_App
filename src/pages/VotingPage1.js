import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";

export default function Page1({
  favoriteCandidate,
  happyWithProgress,
  setFavoriteCandidate,
  setHappyWithProgress
}) {
  const candidates = ["Johnny Bravo", "Satoshi Nakamoto", "Thanos"];
  const happies = [
    "Very unhappy",
    "Somewhat unhappy",
    "Neutral",
    "Somewhat happy",
    "Very happy"
  ];

  const onChangeCandidate = e => {
    setFavoriteCandidate(e.target.value);
  };
  const onChangeHappy = e => {
    setHappyWithProgress(e.target.value);
  };
  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography component="h2">Part 1</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">Who is your favorite candidate?</Typography>
        <RadioGroup
          aria-label="candidate"
          name="candidate"
          defaultValue={favoriteCandidate}
          onChange={onChangeCandidate}
        >
          {candidates.map((candidate, i) => (
            <FormControlLabel
              key={i}
              value={candidate}
              control={<Radio color="primary" />}
              label={candidate}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">
          How happy are you with the current progress?
        </Typography>
        <RadioGroup
          aria-label="happy"
          name="happy"
          defaultValue={happyWithProgress}
          onChange={onChangeHappy}
        >
          {happies.map((happy, i) => (
            <FormControlLabel
              key={i}
              value={happy}
              control={<Radio color="primary" />}
              label={happy}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}