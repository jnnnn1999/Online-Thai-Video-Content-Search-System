import React from "react";
import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    List,
    Segment
} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Home1 from "../assets/images/Home1.png";
import Home2 from "../assets/images/Home2.png";
import Home3 from "../assets/images/Home3.png";

export function LandingPage() {
return(
    <React.Fragment>
        <div style={{ backgroundImage: `url(${Home1})` }}>
            <br /><br /><br /><br />
            <container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link to="/"><img src={logo}></img></Link>
            </container><br /><br /><br /><br />
            <Segment style={{ padding: "8em 0em"}} >
                <Container textAlign="center">
                    <Header as="h3" style={{ fontSize: "3em", color: "white", marginLeft: "540px"}}>
                        Transcribe & Search
                    </Header><br />
                    <p style={{ fontSize: "1.33em", color: "white", marginLeft: "520px" }}>
                        Add a YouTube link to search content in Thai video.
                    </p><br />
                    <Link to="/login">
                        <Button size="huge" style={{ marginLeft: "690px"}} className="items-center mt-3 bg-orange-400 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-orange-500 ">
                            Get started
                        </Button>
                    </Link><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Container>
            </Segment>
        </div>
        <div style={{ backgroundImage: `url(${Home2})` }}>
            <Segment style={{ padding: "8em 0em" }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={9} style={{ marginLeft: "300px"}}>
                            <Header as="h3" style={{ fontSize: "2.5em" }}>
                                Why do we need to search for content in videos?
                            </Header><br />
                            <p style={{ fontSize: "1.5em" }}>
                                How many hours do you study online?<br />
                                Can you quickly search the content that you want in the video?<br />
                                This website will help you search content in YouTube videos quickly and save your time.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid><br /><br /><br /><br /><br /><br />
            </Segment>
        </div>
        <div style={{ backgroundImage: `url(${Home3})` }}>
            <Segment style={{ padding: "8em 0em" }} vertical>
                <Grid container stackable verticalAlign="center">
                    <Header as="h3" style={{ fontSize: "2.5em", marginLeft: "550px"}}>
                        What's is our features?
                    </Header><br /><br /><br /><br /><br />
                    <Grid.Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Grid.Column width={7}>
                            <Header as="h3" style={{ fontSize: "2em", marginLeft: "400px"}}>
                                Transcribe
                            </Header><br />
                            <p style={{ fontSize: "1.5em", marginLeft: "400px" }}>
                                Converting video to text.
                            </p><br />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h3" style={{ fontSize: "2em", marginLeft: "300px" }}>
                                Search
                            </Header><br />
                            <p style={{ fontSize: "1.5em" , marginLeft: "300px"}}>
                                Search the desired content in the video.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid><br /><br /><br />
            </Segment>
        </div>
        
    </React.Fragment>
)

}