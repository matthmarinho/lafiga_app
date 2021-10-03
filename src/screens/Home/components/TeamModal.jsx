import React, { useState, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles';
import {
    List, Typography,
    IconButton, ListItem, ListItemText, 
    Select, MenuItem,
    Box, Toolbar, TextField
} from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import GroupService from '../services/group'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import EditIcon from '@mui/icons-material/Edit'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
export default function TeamModal({groups, openDrower, handleTeamDrawerClose, user}) {

    const [creatingGroup, setCreatingGroup] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editionGroup, setEditionGroup] = useState()
    const [newPlayers, setNewPlayers] = useState([])
    const [groupName, setGroupName] = useState()
    const [season, setSeason] = useState()
    const [editedGroupName, setEditedGroupName] = useState()
    const [editedSeason, setEditedSeason] = useState()
    const [editedDay, setEditedDay] = useState()
    const [day, setDay] = useState()
    const [name, setName] = useState()
    const [member, setNewMember] = useState()
    const [groupsObject, setGroupObject] = useState(groups)
    const admin = Boolean(user && user.role_id === 1 ? true : false)


    const seasons = [
        'Verão',
        'Outono',
        'Inverno',
        'Primavera'
      ];
    const days = Array.from({length:120},(v,k)=>k+1)
    const hundleCreatingGroup = () => {
        setCreatingGroup(true)
    }

    const hundleCancelCreatingGroup = () => {
        setCreatingGroup(false)
    }

    const deleteGroup = (group) => {
        GroupService.remove(group.id)
        .then(response => {
            getGroups()
        })
        .catch(e => {
            console.error(e);
        });
    }

    const saveEditedGroup = () => {
        if(editedGroupName === '') return alert('O nome não pode estar vazio')
        if(editedSeason === '') return alert('Estação não pode estar vazia')
        if(editedDay === '') return alert('O dia não pode estar vazio')
        if(typeof(Number(editedDay)) !== 'number') return alert('O dia tem que ser um numero')

        let data = {
            id: editionGroup?.id,
            name: editedGroupName,
            day: Number(editedDay),
            season: editedSeason
        }

        GroupService.update(editionGroup?.id, data)
            .then(response => {
                getGroups()
            })
            .catch(e => {
                console.error(e);
            });
    
        setEditionGroup()
    }

    const handleEdition = useCallback(() => {
        if (!editionGroup) return
        const seasonAndDate = editionGroup?.date.replace('º','').replace('dia','').split(' - ');
        setEditedSeason(seasonAndDate[0])
        setEditedGroupName(editionGroup?.group)
        setEditedDay(Number(seasonAndDate[1].replace(' ','')))
    }, [editionGroup])

    const editGroup = (group) => {
        if (editing) {
            cancelEdit()
        }
        setEditing(true)
        setEditionGroup({
            id: group.id,
            group: group.group,
            date: group.date,
            players: group.players
        })
        handleEdition()
    }


    const cancelEdit = () => {
        setEditing(false)
        setEditionGroup()
        setEditedGroupName()
        setEditedSeason()
        setEditedDay()
    }
    const getGroups = async () => {
        GroupService.getAll()
            .then(response => {
                if (response.data.length > 0) {
                    let group = response.data.map(x => Object.assign(x, {
                        group: x.name,
                        date: `${x.season} - ${x.day}º dia`,
                        players: x.players
                    }))
                    setGroupObject(group)
                }
            })
            .catch(e => {
                console.error(e);
            });
    }
    

    const saveNewGroup = () => {
        if(!groupName || groupName === '') return alert('O nome não pode estar vazio')
        if(!season || season === '') return alert('Estação não pode estar vazia')
        if(!day || day === '') return alert('O dia não pode estar vazio')
        if(typeof(Number(day)) != 'number' || Number(day) === 'NaN') return alert('O dia tem que ser um numero')
        if(!newPlayers.length) return alert('O grupo precisa ter pelo menos um membro')

        const payload = {
            "group": {
                "name": groupName,
                "season": season,
                "day": day,
                "players_attributes": newPlayers
            }
        }

        GroupService.create(payload)
        .then(response => {
            getGroups()
        })
        .catch(e => {
            console.error(e);
        });

        setCreatingGroup(false)
        setNewPlayers([])
        setGroupName('')
        setSeason('')
        setDay('')
    }

    const removeNewPlayerNewGroup = (i) => {
        setNewPlayers(newPlayers.filter(player => player !== newPlayers[i]))
    }

    const removePlayerFromGroup = (group, id) => {

        let data = {
            "id": editionGroup?.id,
            "player_id":  id,
            "remove": true
        }

        GroupService.update(group.id, data )
            .then(response => {
                getGroups()
            })
            .catch(e => {
                console.error(e);
            });
    
        setEditionGroup()
    }

    const saveNewPlayers = () => {
        if( !name || name === '') return alert('O nome não pode estar vazio')
        setNewPlayers([...newPlayers, {name: name}])
        setName('')
        
    }

    const saveNewPlayersOnGroup = (group) => {
        let data = {
            "id": editionGroup?.id,
            "players_attributes": {
                "name": member,
                "group_id": group.id
            },
            "new_player": true
        }

        GroupService.update(group.id, data )
            .then(response => {
                getGroups()
            })
            .catch(e => {
                console.error(e);
            });
    
        setEditionGroup()

        setNewMember('')
    }

    const renderMembers = (member, i, group = 'newGroup') => {
        return (
            <ListItem key={i}>
                <Typography style={{width: '100%'}}>
                    {member.name}
                </Typography>
                {
                    admin && 
                    <IconButton onClick={group === 'newGroup' ? () => removeNewPlayerNewGroup(i) : () => removePlayerFromGroup(group, member.id)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                }

            </ListItem>
        )
    }

    const renderGroupIcons = (group) => {
        if(!admin) return
        return (
            <>
                <IconButton key={`edit_group_icon_${group.id}`} style={{marginLeft: '5%'}} onClick={() => editGroup(group)}>
                    <EditIcon />
                </IconButton>
                <IconButton  key={`delete_group_icon_${group.id}`} onClick={() => deleteGroup(group)}>
                    <DeleteIcon />
                </IconButton>
            </>
        )
    }

    const renderEditGroupIcons = (group) => {
        return (
        <>
            <IconButton 
                key={`save_group_icon_${group.id}`} 
                style={{marginLeft: '5%'}} 
                onClick={() => saveEditedGroup()}
            >
                <SaveIcon />
            </IconButton>
            <IconButton 
                key={`cancel_group_icon_${group.id}`} 
                onClick={() => cancelEdit()}
            >
                <CancelIcon />
            </IconButton>
        </> 
        )
    }

    const renderGroups = () => {
        if (!groupsObject) return
        return groupsObject.sort((a,b) => a?.id - b?.id).map((group) => {
            return (
            <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={group?.id}
                  id={group?.id}
                >
                    {
                        editing && editionGroup?.id === group?.id ? 
                        <>
                         <ListItem key={`list_${group?.id}`}>
                            <TextField 
                                key={`group_name_${group?.id}`}
                                label="Nome" 
                                variant="outlined"     
                                size="small"                            
                                value={editedGroupName}
                                onInput={e => setEditedGroupName(e.target.value)}
                            />
                        <Select
                            labelId={`edit_season_${group?.id}`}
                            key={`edit_season_${group?.id}`}
                            size="small"
                            value={editedSeason}
                            onChange={e => setEditedSeason(e.target.value)}
                            >
                            {seasons.map((season) => (
                                <MenuItem
                                key={season}
                                value={season}
                                >
                                {season}
                                </MenuItem>
                            ))}
                            </Select>
                            <Select
                            labelId={`edit_day_${group?.id}`}
                            label="Dia" 
                            variant="outlined"         
                            key={`edit_day_${group?.id}`}
                            size="small"
                            value={editedDay}
                            onChange={e => setEditedDay(e.target.value)}
                            >
                            {days.map((day) => (
                                <MenuItem
                                key={day}
                                value={day}
                                >
                                {day}
                                </MenuItem>
                            ))}
                            </Select>

                        </ListItem>
                        </> :
                    <ListItem key={group?.id}>
                        <ListItemText primary={`${group.group} - ${group.date}`} />
                    </ListItem>
                    }

                </AccordionSummary>
                {
                    editing && editionGroup?.id === group?.id ?
                    renderEditGroupIcons(group) : renderGroupIcons(group)

                }
                <AccordionDetails>
                    <List>
                        {group.players?.map((player, i) => {
                            return renderMembers(player, i, group)
                        })}
                        {
                            admin &&
                            <>
                                <TextField 
                                    key={`member_${group?.id}`} 
                                    style={window.innerWidth > 500 ? { width: '85%' } : {width: '80%'}}
                                    value={member}
                                    size="small"
                                    onInput={e => setNewMember(e.target.value)}
                                    label="Novo Membro" 
                                    variant="outlined" 
                                />
                                <IconButton onClick={() => saveNewPlayersOnGroup(group)}>
                                    <ControlPointIcon />
                                </IconButton>
                            </>
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
            )
        })
    }

    const creatingGroupIcons = () => {
        if(!admin) return 
        return (
            !creatingGroup ? 
            <IconButton onClick={() => hundleCreatingGroup()}>
                <GroupAddIcon />
            </IconButton> 
            :
            <>
                <IconButton onClick={() => saveNewGroup() }>
                    <SaveIcon />
                </IconButton>
                <IconButton onClick={() => hundleCancelCreatingGroup() }>
                    <CancelIcon />
                </IconButton>
            </>
        )
    }

    useEffect(() => {
        handleEdition()
    }, [handleEdition])

    return (
        <Box
            sx={window.innerWidth > 500 ? { width: 400 } : {width: 300}}
            role="presentation"
        >
          <div style={{marginTop: '20%'}}></div>
          <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    px: [1],
                }}
           >
            <IconButton onClick={() => handleTeamDrawerClose()}>
                    <ChevronRightIcon />
            </IconButton>
            <div style={{width: '100%'}}></div>
            {
                creatingGroupIcons()
            }
          </Toolbar>
          <List>
              {creatingGroup &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={'new-group'}
                        id={'new-group'}
                    >
                        <ListItem key={'new-group'}>
                            <TextField 
                                key={'group_name'}
                                label="Nome"
                                required
                                size="small"
                                variant="outlined"                                 
                                value={groupName}
                                onInput={e => setGroupName(e.target.value)}
                            />
                            <Select
                                labelId={`edit_season`}
                                key={`edit_season`}
                                size="small"
                                value={season}
                                onChange={e => setSeason(e.target.value)}
                            >
                            {seasons.map((season) => (
                                <MenuItem
                                key={season}
                                value={season}
                                >
                                {season}
                                </MenuItem>
                            ))}
                            </Select>
                            <TextField 
                                key={'group_day'}
                                label="Dia" 
                                size="small"
                                variant="outlined"                                 
                                value={day}
                                onInput={e => setDay(e.target.value)}
                                required
                            />
                        </ListItem>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {newPlayers.map((player, i) => {
                                return renderMembers(player, i)
                            })}
                            <TextField 
                                label="Name"
                                style={window.innerWidth > 500 ? { width: '85%' } : {width: '80%'}}
                                id="outlined-margin-none"
                                size="small"
                                variant="outlined"
                                value={name}
                                onInput={e => setName(e.target.value)}
                                required={newPlayers.length ? false : true}
                            />
                            <IconButton style={{marginTop: '5px'}} onClick={() => saveNewPlayers()}>
                                <ControlPointIcon />
                            </IconButton>
                        </List>
                    </AccordionDetails>
                </Accordion>
              }
              
            {groupsObject && renderGroups()}
          </List>
        </Box>
    )
}
