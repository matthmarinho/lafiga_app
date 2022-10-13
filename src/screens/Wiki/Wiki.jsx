import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Paper } from '@mui/material'
import Feed from '../../components/Feed/Feed'
import Carousel from '../../components/CarouselContent/CarouselContent'
import { isBrowser } from 'react-device-detect'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://lafiga.herokuapp.com/">
        Láfiga
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function WikiContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          paddingTop: 8,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={isBrowser ? { mt: 4, mb: 4 } : null}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              <Paper
                elevation={5}
                sx={{
                  p: isBrowser ? 2 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Feed
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Armor bonus class skill dispel check dodge bonus enhancement bonus fighter fire domain initiative count intelligence large massive damage outer plane petrified poison spell slot strength domain take 10 time domain trickery domain untrained.

                  Aberration type ability chaotic subtype constitution dazzled hit points law domain necromancy negative energy renewal domain stack strength domain. Air subtype archon subtype base attack bonus charisma command word item destruction domain dodge bonus drow domain electrum flank guardinal subtype melee touch attack moon domain move action nonintelligent plant type range penalty ranged attack scalykind domain scribe special quality spontaneous casting vulnerability to energy.

                  Action bonus charm cold domain cowering disabled fey type giant type illusion manufactured weapons negative energy plane nonplayer character plant type player character resistance bonus shaken target turning check unconscious. Creation subschool dwarf domain fear cone gaze light weapon metal domain monstrous humanoid type move action petrified ray strength water domain.

                  Animal type automatic miss circumstance bonus class skill competence bonus deal damage enhancement bonus fine full normal hit points immunity melee attack mentalism domain miniature figure plane of existence ranged attack result sonic attack spell strength.

                  Animal domain arcane spell failure blindsight continuous damage cowering dwarf domain fear ray glamer subschool illusion domain immediate action initiative check ranged attack roll ranged touch attack shaken spell immunity turn turn resistance.

                  Balance domain chaos domain dispel check effective character level insight bonus native subtype point of origin reach weapon scent teleportation subschool threat range. Action augmented subtype automatic hit blindsight creature divine spell double weapon drowning fear cone glamer subschool illusion domain initiative count nonplayer character shield bonus stable telepathy total cover unarmed attack.

                  Ability drain armor bonus chaotic subtype competence bonus cross-class skill destruction domain diminutive eladrin subtype electrum gargantuan negative level orc domain pinned plane of shadow platinum piece rend reptilian subtype round scent skill points small special quality spell strength sun domain thirst touch spell transitive plane unarmed attack vulnerability to energy.

                  Ability score loss adventuring party chaotic subtype command word item entangled level luck domain pinned ranged attack spell immunity strength domain unconscious undead type will save.

                  Ability score ability score loss charm subschool critical hit dispel drowning fraction grapple check insight bonus spell version.

                  Ability modifier animal type automatic hit deal damage good domain lethal damage low-light vision nauseated nobility domain ocean domain rebuke undead reflex save saving throw speed standard action threaten travel domain turn turning damage two-handed weapon unconscious.

                  Adventuring party armor bonus attack of opportunity attack roll calling subschool darkvision energy drain failure gaze natural ability scent spell immunity. Ability check charm concealment earth subtype fighter fire domain paralyzed range penalty rebuke undead rounding spell slot subject telepathy turning check vulnerability to energy.

                  5-foot step arcane spell failure automatic hit base save bonus command undead conjuration enhancement bonus evasion extraplanar subtype fatigued force damage gold piece incorporeal mundane nauseated plant domain ranged attack roll rogue size modifier special quality spell preparation tanar'ri subtype threat threatened square turning damage water subtype.

                  Armor bonus class skill dispel check dodge bonus enhancement bonus fighter fire domain initiative count intelligence large massive damage outer plane petrified poison spell slot strength domain take 10 time domain trickery domain untrained.

                  Air subtype animal type antimagic aquatic subtype augmented subtype blindsense bonus calling subschool cleric critical roll direct a spell disease energy drained extraplanar subtype failure family domain fascinated flight hardness kind profane bonus reach weapon redirect a spell resistance bonus sickened skill modifier swarm subtype trained turning check.

                  Adjacent balance domain copper piece full-round action immunity penalty psionics skill rank spell version staggered subtype tanar'ri subtype target total concealment touch attack. Ability damage ability score animal type armor class base land speed battle grid calling subschool change shape cleric concentrate on a spell earth domain environment flank halfling domain healing subschool material plane ranged weapon sacred bonus transmutation.

                  Armor class casting time character cleric dexterity dispel electrum energy charge energy drained ethereal plane extraplanar level adjustment positive energy plane profane bonus skill points summoning subschool swallow whole temporary hit points trample travel domain.

                  Command word item energy damage energy drained ethereal fear aura line of effect masterwork positive energy racial bonus reach weapon sacred bonus shadow subschool spell version. Action animal domain aquatic subtype attack class level construct type cross-class skill damage reduction destruction domain difficulty class extraordinary ability favored class figment subschool gaze giant type granted power melee monk phantasm subschool plant domain platinum piece slime domain spell preparation spell trigger item swarm subtype water dangers water domain.

                  Air subtype artifact chaos domain compulsion construct type craft domain dead dwarf domain enemy energy drained exhausted hit incorporeal subtype known spell law domain melee touch attack mentalism domain metal domain multiplying positive energy skill check splash weapon take 10 unarmed attack untrained.

                  Ability adjacent animal domain chaos domain concealment constitution constrict difficulty class extraordinary ability fascinated free action hit points knowledge domain low-light vision pounce scry smoke effects spell level square total cover transmutation treasure two-handed weapon unarmed attack.

                  Ability check charm concealment earth subtype fighter fire domain paralyzed range penalty rebuke undead rounding spell slot subject telepathy turning check vulnerability to energy. Ability modifier animal type automatic hit deal damage good domain lethal damage low-light vision nauseated nobility domain ocean domain rebuke undead reflex save saving throw speed standard action threaten travel domain turn turning damage two-handed weapon unconscious.

                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Paper
                elevation={5}
                sx={{
                  p: isBrowser ? 2 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
                    </Typography>
                  </CardContent>
                  <Collapse timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </React.Fragment >
  )
}

export default function Home() {
  return <WikiContent />
}