import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import {makeStyles} from '@material-ui/core/styles'
import {Alert, AlertTitle} from '@material-ui/lab'
import CircularProgress from '@material-ui/core/CircularProgress'
import {useFetchData} from '../utils/hooks'
import './Netflix.css'

// 🐶 Ajoute des nouveaux types de <NetflixRow /> dans le render
const useStyles = makeStyles(theme => ({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
}))

const NetflixApp = () => {
  const classes = useStyles()
  const {data: headerMovie, error, status, execute} = useFetchData()
  const [type] = React.useState(getRandomType())
  const defaultMovieId = getRandomId(type)
  const [queried, setQueried] = React.useState(true)

  React.useEffect(() => {
    if (!queried) {
      return
    }
    execute(clientApi(`${type}/${defaultMovieId}`))
    setQueried(false)
  }, [execute, defaultMovieId, queried, type])

  if (status === 'error') {
    // sera catché par ErrorBoundary
    throw new Error(error.message)
  }
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie?.data} type={type} />

      {/* 
      🐶 Ajoute les 'props' suivants :
        - 'watermark' à 'true'
        - 'type' à TYPE_MOVIE
        - 'filter' à 'trending'
        - 'wideImage' à 'true'
      */}
      <NetflixRow wideImage={false} title="Films Netflix" />
      {/* 
      🐶 Ajoute les 'props' suivants :
        - 'watermark' à 'true'
        - 'type' à TYPE_TV
        - 'filter' à 'trending'
        - 'wideImage' à 'false'
      */}
      <NetflixRow wideImage={true} title="Série Netflix" />

      {/* 
        👨‍✈️ Hugo le chef de projet demande d'ajouter une nouvelle ligne "Les mieux notés"
        cette ligne contiendra des films avec le logo 'netflix' et les images en format large.
        🐶 ajoute un  'NetflixRow' avec les bons props
      */}

      {/* 
        👨‍✈️ Hugo le chef de projet demande d'ajouter une nouvelle ligne "Action & aventure"
        cette ligne contiendra des series avec le logo 'netflix' et les images en format large.
        🐶 ajoute un 'NetflixRow' avec les bons props
        - l'id de genre 'Action & aventure' est le '10759'
      */}

      {/* 
        👨‍✈️ Hugo le chef de projet demande d'ajouter une nouvelle ligne "Les meilleurs Thrillers"
        cette ligne contiendra des series sans le logo 'netflix' et les images en format poster.
        🐶 ajoute un 'NetflixRow' avec les bons props
        - l'id de genre 'Les meilleurs Thrillers' est le '53'
      */}

      {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity="error">
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Detail : {error.message}
          </Alert>
        </div>
      ) : null}

      {status === 'fetching' ? (
        <div className={classes.progress}>
          <CircularProgress />{' '}
        </div>
      ) : null}
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixApp}
