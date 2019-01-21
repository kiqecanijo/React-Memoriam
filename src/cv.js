import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import { Spring } from 'react-spring'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const Cv = props => {
  return (
    <CssBaseline>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {spring => (
          <Grid container spacing={8} justify="center">
            <Grid item xs={10} md={8} lg={6}>
              <Paper>
                <h1>IN DEVELOP</h1>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Spring>
    </CssBaseline>
  )
}

export default Cv
