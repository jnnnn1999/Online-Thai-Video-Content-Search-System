import { useEffect, useState } from "react";
import { useParams } from "react-router"

import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom'

import axios from "axios";
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { searchURL } from "../api"
import { Button } from 'react-bootstrap';

import { API } from "../api"
import YouTube from "react-youtube";
var getYouTubeID = require("get-youtube-id");



export function Search() {

    const useStyles = makeStyles((theme) => ({
        appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        link: {
            margin: theme.spacing(1, 1.5),
        },
        toolbarTitle: {
            flexGrow: 1,
        },
    }));


    const classes = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useSearchParams();

    const goSearch = (e) => {
        navigate({
            pathname: 'search/custom/',
            search: '?search=' + data,
        });
        window.location.reload();
    };

    const search = searchURL;
    const { id } = useParams()
    const [appState, setAppState] = useState({
        search: '',
        transcribes: [],
    });

    useEffect(() => {
        axios.get(search + window.location.search).then((res) => {
            const allwords = res.data;
            setAppState({ transcribes: allwords });
            console.log(res.data);
        });
        axios.get(API.files.retrieve(id))
                .then(res => {
                    
                    setAppState(res.data)
                    console.log(res.data)
                })
    }, [setAppState,id]);

    // const [file, setfiles] = useState(null)
  

    // useEffect(() => {
    //     function fetchfiles() {
    //         axios.get(API.files.retrieve(id))
    //             .then(res => {
    //                 console.log(res.data)
    //                 setfiles(res.data)
    //             })
    //     }
    //     fetchfiles()
    // }, [id])

    const [youtube_id_db] = useState("oChfvGGteZE");
    console.log(youtube_id_db)

    return (

        <div style={{ background: '#1365af'}}><br /><br />
        <Container maxWidth="md" component="main">
            <br />
            <SearchBar
                value={data.search}
                onChange={(newValue) => setData({ search: newValue })}
                onRequestSearch={() => goSearch(data.search)}
            />
            <br /><br />
            <Grid container alignItems="flex-end">
                
                {appState.transcribes.map((transcribe) => {
                    return (
                        
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={transcribe.id} xs={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    word: {transcribe.word} <br />
                                    time:  {transcribe.start_time} second<br /><br />
                                    <button
                                        className="mt-3 bg-orange-400 rounded-md shadow-sm text-lg px-3 py-1 hover:bg-orange-500"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `https://www.youtube.com/embed/${youtube_id_db}?start=${transcribe.start_time}`;
                                        }}
                                    > Click here to see video</button>
                                        


                                </CardContent>
                            </Card><br />
                        </Grid>
                    );
                })}
            </Grid>

        </Container>
    </div>
    );

}

